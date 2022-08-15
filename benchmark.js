const ghActionCore = require('@actions/core');
const cp = require('child_process');
const fs = require('fs');
const NUM_OF_RUNS = 10;

function formatTable(results) {
  results.sort((a, b) => (a.mean > b.mean ? 1 : -1));
  const fastest = results[0];
  const formatted = results.map((r) => [
    `<code>${r.command}</code>`,
    r.mean.toFixed(3),
    r.min.toFixed(3),
    r.max.toFixed(3),
    (r.mean / fastest.mean).toFixed(2),
  ]);

  return [
    [
      { data: 'command', header: true },
      { data: 'mean', header: true },
      { data: 'min', header: true },
      { data: 'max', header: true },
      { data: 'relative', header: true },
    ],
    ...formatted,
  ];
}

function run(cmd, args) {
  return cp.spawnSync(cmd, args, {
    stdio: 'inherit',
    env: { ...process.env, NX_TASKS_RUNNER_DYNAMIC_OUTPUT: 'false', NX_SKIP_NX_CACHE: true },
    cwd: process.cwd(),
  });
}

function logIt(msg) {
  console.log('-----------------------------------');
  console.log(msg);
  console.log('-----------------------------------');
}
const commands = [
  'npx jest --run-in-band',
  'npx nx run-many --target=test --all --parallel=false --run-in-band',
  'npx jest --max-workers=1',
  'npx nx run-many --target=test --all --parallel=false --max-workers=1',
  'npx jest --max-workers=2',
  'npx nx run-many --target=test --all --parallel=false --max-workers=2',
  'npx nx run-many --target=test --all --parallel=2 --run-in-band',
  'npx jest --max-workers=3',
  'npx nx run-many --target=test --all --parallel=false --max-workers=3',
  'npx nx run-many --target=test --all --parallel=3 --run-in-band',
  'npx jest --max-workers=4',
  'npx nx run-many --target=test --all --parallel=false --max-workers=4',
  'npx nx run-many --target=test --all --parallel=4 --run-in-band'
]

logIt('Starting w/o cache benchmarks');

run('hyperfine', [
  '-m',
  NUM_OF_RUNS,
  // clear jest cache before each run
  '-p',
  'npx jest --clear-cache',
  ...commands,
  '--export-json=benchmark-no-cache.json',
  '--export-markdown=benchmark-no-cache.md',
]);
logIt('Starting w/ cache benchmarks');
run('hyperfine', [
  '-m',
  NUM_OF_RUNS,
  // clear jest cache before each run
  '-w', 1,
  ...commands,
  '--export-json=benchmark-cache.json',
  '--export-markdown=benchmark-cache.md',
]);

const withoutCacheResults = require('./benchmark-no-cache.json');
const withCacheResults = require('./benchmark-cache.json');
const summary = ghActionCore.summary
  .addHeading('No cache', 2)
  .addTable(formatTable(withoutCacheResults.results))
  .addHeading('With cache', 2)
  .addTable(formatTable(withCacheResults.results));

if (process.env.GITHUB_STEP_SUMMARY) {
  summary
    .write()
    .then()
    .catch((err) => {
      console.error('Unable to write summary', err);
    });
} else {
  console.log('GITHUB_STEP_SUMMARY not set. Generating benchmark.html');
  fs.writeFileSync('benchmark.html', summary.stringify());
}

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
    env: { ...process.env, NX_TASKS_RUNNER_DYNAMIC_OUTPUT: 'false' },
    cwd: process.cwd(),
  });
}

function logIt(msg) {
  console.log('-----------------------------------');
  console.log(msg);
  console.log('-----------------------------------');
}

const commonArgs = [
  '-L',
  'jestArgs',
  '--runInBand,--max-workers=3',
  '-L',
  'nxArgs',
  '--parallel=false,--parallel=3',
];
const commonCmds = [
  'npx nx run-many --target=test --all {jestArgs} {nxArgs} --skip-nx-cache',
  'jest {jestArgs}',
];

logIt('Starting w/o cache benchmarks');
const noCacheArgs = [
  '-m',
  NUM_OF_RUNS,
  // clear jest cache before each run
  '-p',
  'npx jest --clear-cache',
  // prep args for each run
  ...commonArgs,
  // run nx w/ args
  ...commonCmds,
  '--export-json=benchmark-no-cache.json',
  '--export-markdown=benchmark-no-cache.md',
];
run('hyperfine', noCacheArgs);
logIt('Starting w/ cache benchmarks');
const cachedArgs = [
  '-m',
  NUM_OF_RUNS,
  // warm jest cache before runs
  '-w',
  1,
  // prep args for each run
  ...commonArgs,
  // run nx w/ args
  ...commonCmds,
  '--export-json=benchmark-cache.json',
  '--export-markdown=benchmark-cache.md',
];
run('hyperfine', cachedArgs);

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
  console.log('GITHUB_STEP_SUMMARY not set. Generating html');
  fs.writeFileSync('benchmark.html', summary.stringify());
}

const ghActionCore = require('@actions/core');
const cp = require('child_process');

function formatTable(results) {
  results.sort((a, b) => (a.mean > b.mean ? 1 : -1));
  const fastest = results[0];
  return [
    [
      { data: 'command', header: true },
      { data: 'mean', header: true },
      { data: 'min', header: true },
      { data: 'max', header: true },
      { data: 'relative', header: true },
    ],
    ...results.map((r) => [
      `\`${r.command}\``,
      r.mean,
      r.min,
      r.max,
      Number((r.mean / fastest.mean).toFixed(2)),
    ]),
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
  1,
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
  1,
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

if (process.env.GITHUB_STEP_SUMMARY) {
  ghActionCore.summary
    .addHeading('Benchmark results')
    .addBreak()
    .addHeading('No cache', 2)
    .addCodeBlock(noCacheArgs.join(' '), 'bash')
    .addTable(formatTable(withoutCacheResults.results))
    .addHeading('With cache', 2)
    .addTable(formatTable(withCacheResults.results))
    .write()
    .then()
    .catch((err) => {
      console.error('Unable to write summary', err);
    });
} else {
  console.log('GITHUB_STEP_SUMMARY not set');
}

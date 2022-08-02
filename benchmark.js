const os = require('os');
const cp = require('child_process');


  function run(cmd,args) {
    return cp.spawnSync(
     cmd,
      args,
      { stdio: 'inherit', env: { ...process.env, NX_TASKS_RUNNER_DYNAMIC_OUTPUT: 'false' },cwd: process.cwd() }
    );
  }

function logIt(msg) {
  console.log('-----------------------------------')
  console.log(msg)
  console.log('-----------------------------------')
}


// run in band
// hyperfine "npx jest --clear-cache && npx nx run-many --target=test --all --runInBand --skip-nx-cache
const commonArgs = [
  '-L','jestArgs', '--runInBand,--max-workers=3',
  '-L', 'nxArgs', '--parallel=false,--parallel=3'];
  const commonCmds = [
    'npx nx run-many --target=test --all {jestArgs} {nxArgs} --skip-nx-cache',
    'jest {jestArgs}'];
logIt('Starting w/o cache benchmarks')
run('hyperfine', [
  '-m', 1,
  // clear jest cache before each run
  '-p', 'npx jest --clear-cache',
  // prep args for each run
  ...commonArgs,
  // run nx w/ args
  ...commonCmds,
  '--export-json=benchmark-no-cache.json']);
  // run 8 benchmarks for each arg in the lists * number of commands. Each benchmark runs 10 times.
  // 1. nx --runInBand --parallel=false
  // 2. jest --runInBand
  // 3. nx --max-workers=3 --parallel=false
  // 4. jest --max-workers=3
  // 5. nx --runInBand --parallel=3
  // 6. jest --runInBand
  // 7. nx --max-workers=3 --parallel=3
  // 8. jest --max-workers=3

logIt('Starting w/ cache benchmarks')
run('hyperfine', [
  '-m', 1,
  // warm jest cache before runs
  '-w', 1,
  // prep args for each run
  ...commonArgs,
  // run nx w/ args
  ...commonCmds,
  '--export-json=benchmark-cache.json']);

const withoutCacheResults = require('./benchmark-no-cache.json');
const withCacheResults = require('./benchmark-cache.json');

// TODO(caleb) do stuff with benchmark json)

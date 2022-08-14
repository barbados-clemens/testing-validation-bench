import { execSync } from 'child_process';

import { logger } from '@nrwl/devkit';

import { Octokit } from '@octokit/action';

if (!process.env.GITHUB_TOKEN) {
  logger.error('GITHUB_TOKEN not set');
  process.exit(1);
}

const GHT = process.env.GITHUB_TOKEN;

console.log('Github Token: ', GHT, ' token length: ', GHT?.length);

const { localVersion, latestVersion } = getNxVersions();

function runMigrations(): boolean {
  try {
    execSync(`npx nx migrate latest`, {
      stdio: 'inherit',
    });

    execSync(`npx nx migrate --run-migrations --create-commits`, {
      stdio: 'inherit',
    });
  } catch (e) {
    return false;
  }
  return true;
}

function getNxVersions() {
  const { devDependencies } = require('../package.json');
  const npmInfo = JSON.parse(execSync('npm info nx --json').toString());
  return {
    latestVersion: npmInfo['dist-tags'].latest,
    localVersion: devDependencies['nx'],
  };
}
function makeMigrationSummary() {
  const text = require('../migrations.json')
    .migrations.map(
      (
        mg: { name: string; description: string; package: string },
        idx: number
      ) => {
        return `${idx + 1}. [${mg.package}] ${mg.description}`;
      }
    )
    .join('\n');

  return `
# Nx Migration Summary

> v${localVersion} -> v${latestVersion}

${text}`;
}
async function makeGhPr({
  title,
  body,
  owner,
  repo,
}: {
  title: string;
  body: string;
  owner: string;
  repo: string;
}) {
  const kit = new Octokit();
  kit.log = logger;
  return await kit.rest.pulls
    .create({
      title,
      body,
      owner,
      repo,
      head: `update-nx-v${latestVersion}`,
      base: 'main',
    })
    .then((r) => {
      logger.info(`PR created: ${r.data.html_url}`);
    });
}
async function makeGhIssue({
  body,
  title,
  owner,
  repo,
}: {
  body: string;
  title: string;
  owner: string;
  repo: string;
}) {
  const kit = new Octokit();
  kit.log = logger;
  await kit.rest.issues
    .create({
      title,
      body,
      owner,
      repo,
    })
    .then((r) => {
      logger.info(`Issue created: ${r.data.html_url}`);
    });
}

function removeMigrationFile() {
  // TODO: this doesn't seem to remove the migration file? 🤔
  // if (existsSync('../migrations.json')) {
  //   rmSync('../migrations.json');
  //   execSync(`git commit -A --amend --no-edit`, { stdio: 'inherit' });
  //   execSync(`git push --no-verify --set-upstream origin ${branchName}`, {
  //     stdio: 'inherit',
  //   });
  // }
}

function setupBranch(branch: string) {
  execSync(`git checkout -b ${branch}`, {
    stdio: 'inherit',
  });
  const existingEmail = execSync(
    `git config user.email "noreply@nx.dev"`
  ).toString();
  const existingUser = execSync(
    `git config user.name "Nx Migration Bot"`
  ).toString();
  if (!existingEmail || !existingUser) {
    execSync(`git config user.email "noreply@nx.dev"`);
    execSync(`git config user.name "Nx Migration Bot"`);
  }
}

function remoteBranchExist(branch: string) {
  // TODO: if the PR failed, but refs are pushed. recreate the PR without pushing.
  return !!execSync(`git ls-remote --heads origin ${branch}`).toString();
}

async function start() {
  if (localVersion === latestVersion) {
    logger.info(`NX version is up to date: ${localVersion}`);
    process.exit(0);
  }
  logger.info(
    `NX version is outdated. Migrating ${localVersion} -> ${latestVersion}`
  );

  try {
    const branchName = `update-nx-v${latestVersion}`;
    if (remoteBranchExist(branchName)) {
      logger.info(
        `Branch exists: origin/${branchName}. Merge branch to update nx.`
      );
      process.exit(0);
    }

    setupBranch(branchName);

    const success = runMigrations();
    const migrationSummary = makeMigrationSummary();
    removeMigrationFile();

    if (success) {
      logger.info(`NX version updated to ${latestVersion}`);
      execSync(`git push --no-verify --set-upstream origin ${branchName}`);
      await makeGhPr({
        title: `chore(repo): update nx v${localVersion} -> v${latestVersion}`,
        body: migrationSummary,
        owner: 'barbados-clemens',
        repo: 'testing-validation-bench',
      });
    } else {
      logger.warn(
        `NX unable to migrate to ${latestVersion}. Attempting to create issue.`
      );
      await makeGhIssue({
        title: `Unable to migrate nx v${localVersion} -> v${latestVersion}`,
        body: migrationSummary,
        owner: 'barbados-clemens',
        repo: 'testing-validation-bench',
      });
    }
    process.exit(0);
  } catch (e) {
    logger.error('Issue running migrations :(');
    logger.error(e);
    process.exit(1);
  }
}

start().then(() => {
  logger.info('Done');
});

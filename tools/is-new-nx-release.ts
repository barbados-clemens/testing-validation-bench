import { execSync } from 'child_process';

import { unlinkSync } from 'fs';
import { getOctokit } from '@actions/github';
import { logger } from '@nrwl/devkit';
const GHT = process.env.GITHUB_TOKEN!;

const { localVersion, latestVersion } = getNxVersions();

if (localVersion === latestVersion) {
  logger.info(`NX version is up to date: ${localVersion}`);
  process.exit(0);
}
logger.info(
  `NX version is outdated. Migrating ${localVersion} -> ${latestVersion}`
);

try {
  execSync(`git checkout -b update-nx-v${latestVersion}`, {
    stdio: 'inherit',
  });
  const success = runMigrations();
  const migrationSummary = makeMigrationSummary();

  execSync(
    `git push --no-verify --set-upstream origin update-nx-v${latestVersion}`,
    {
      stdio: 'inherit',
    }
  );

  cleanUp();
  if (success) {
    logger.info(`NX version updated to ${latestVersion}. Creating PR.`);
    makeGhPr({
      title: `chore(repo): update nx v${localVersion} -> v${latestVersion}`,
      body: migrationSummary,
      owner: 'barbados-clemens',
      repo: 'testing-validation-bench',
    });
  } else {
    logger.warn(
      `NX unable to migrate to ${latestVersion}. Attempting to create issue.`
    );
    makeGhIssue({
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
      (mg: { name: string; description: string; package: string }) => {
        return `## [${mg.package}] ${mg.name}\n${mg.description}\n`;
      }
    )
    .join('\n\n');

  return `
# Nx Migration Summary

> v${localVersion} -> v${latestVersion}

${text}`;
}
function makeGhPr({
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
  const kit = getOctokit(GHT);
  kit.rest.pulls
    .create({
      title,
      body,
      owner,
      repo,
      head: `update-nx-v${latestVersion}`,
      base: 'main',
    })
    .then((r) => console.log(r));
}
function makeGhIssue({
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
  const kit = getOctokit(GHT);
  kit.rest.issues
    .create({
      title,
      body,
      owner,
      repo,
    })
    .then((r) => {
      console.log(r);
    });
}

function cleanUp() {
  // delete migrations.json file so it's not committed
  unlinkSync('./migrations.json');
}

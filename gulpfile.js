/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Gulp tasks.
 */

const execSync = require('child_process').execSync;
const fs = require('fs');
const ghpages = require('gh-pages');
const gulp = require('gulp');
const jsgl = require('js-green-licenses');
const path = require('path');
const rimraf = require('rimraf');
const predeployTasks = require('./scripts/gh-predeploy');

gulp.header = require('gulp-header');

/**
 * Run the license checker for all packages.
 * @returns {Promise} A promise.
 */
function checkLicenses() {
  const checker = new jsgl.LicenseChecker({
    // dev: true,
    // verbose: false,
  });
  checker.setDefaultHandlers();
  const pluginsDir = 'plugins';
  const promises = [];
  // Check root package.json.
  promises.push(checker.checkLocalDirectory('.'));
  fs.readdirSync(pluginsDir)
    .filter((file) => {
      return fs.statSync(path.join(pluginsDir, file)).isDirectory();
    })
    .forEach((plugin) => {
      const pluginDir = path.join(pluginsDir, plugin);
      // Check each plugin package.json.
      promises.push(checker.checkLocalDirectory(pluginDir));
    });
  return Promise.all(promises);
}

/**
 * Prepare for publishing. Must be run before any manual publish command.
 *
 * Clones blockly-samples, runs build and tests.
 * @param {Function} done Completed callback.
 */
function prepareForPublish(done) {
  const releaseDir = 'dist';

  // Delete the release directory if it exists.
  if (fs.existsSync(releaseDir)) {
    console.log('Removing previous `dist/` directory.');
    rimraf.sync(releaseDir);
  }

  // Clone a fresh copy of blockly-samples.
  console.log(
    `Checking out a fresh copy of blockly-samples under ` +
      `${path.resolve(releaseDir)}`,
  );
  execSync(
    `git clone https://github.com/RaspberryPiFoundation/blockly-samples ${releaseDir}`,
    {stdio: 'pipe'},
  );

  // Run npm ci.
  console.log('Running npm ci to install.');
  execSync(`npm ci`, {cwd: releaseDir, stdio: 'inherit'});

  // Build all plugins.
  console.log('Building all plugins.');
  execSync('npm run build', {cwd: releaseDir, stdio: 'inherit'});

  // Test all plugins.
  console.log('Testing all plugins.');
  execSync('npm run test', {cwd: releaseDir, stdio: 'inherit'});

  done();
}

/**
 * Exit early if the release directory does not exist.
 * @param {string} releaseDir release directory to check
 * @param {Function} done Gulp callback.
 */
function exitIfNoReleaseDir(releaseDir, done) {
  // Check that release directory exists.
  if (!fs.existsSync(releaseDir)) {
    console.error(
      `No release directory ${releaseDir} exists. ` +
        `blockly-samples may not have been cloned correctly.`,
    );
    done();
    process.exit(1);
  }
}

/**
 * Publishes plugins using lerna. MUST be run after `prepareForPublish`.
 * @param {boolean=} force True for forcing all plugins to publish, even ones
 *     that have not changed.
 * @returns {Function} Gulp task.
 */
function publish(force) {
  return (done) => {
    const releaseDir = 'dist/plugins';
    exitIfNoReleaseDir(releaseDir, done);

    // Run lerna publish. Uses conventional commits for versioning
    // creates the release on GitHub.
    console.log(`Publishing ${force ? 'all' : 'changed'} plugins.`);
    execSync(
      `lerna publish --conventional-commits --create-release github` +
        `${force ? ' --force-publish=*' : ''}`,
      {cwd: releaseDir, stdio: 'inherit'},
    );

    console.log('Removing release directory.');
    rimraf.sync(releaseDir);

    done();
  };
}

/**
 * Publish all plugins that have changed since the last release.
 * Run `npm run publish:prepare` before running this script.
 * @param {Function} done Completed callback.
 * @returns {Function} Gulp task.
 */
function prepareAndPublish(done) {
  return gulp.series(prepareForPublish, publish(false))(done);
}

/**
 * Forces all plugins to publish.
 * Uses the built in lerna option --force-publish=*.
 * @param {Function} done Completed callback.
 * @returns {Function} Gulp task.
 */
function prepareAndForcePublish(done) {
  return gulp.series(prepareForPublish, publish(true))(done);
}

/**
 * Publishes plugins that haven't previously been uploaded to npm.
 * Useful if a previous run of publishing failed after versions were
 * uploaded to github but not all packages were placed uploaded to npm.
 * You must run `npm run publish:prepare` first.
 * @param {Function} done Completed callback.
 */
function publishFromPackage(done) {
  const releaseDir = 'dist/plugins';
  exitIfNoReleaseDir(releaseDir, done);

  // Run lerna publish. Will not update versions.
  console.log(`Publishing plugins from package.json versions.`);
  execSync(`lerna publish from-package`, {
    cwd: releaseDir,
    stdio: 'inherit',
  });

  console.log('Removing release directory.');
  rimraf.sync(releaseDir);
  done();
}

/**
 * Publishes plugins that haven't been previously uploaded to npm.
 * Also runs the prepare scripts to ensure plugins have been built and tested before publishing.
 * @param {Function} done Completed callback.
 * @returns {Function} Gulp task.
 */
function prepareAndPublishFromPackage(done) {
  return gulp.series(prepareForPublish, publishFromPackage)(done);
}

/**
 * Runs lerna version to check which version numbers would be updated.
 * The version numbers will not be pushed and no tags or releases will
 * be created, even if you answer 'yes' to the prompt.
 * @param {Function} done Completed callback.
 */
function checkVersions(done) {
  const releaseDir = 'dist/plugins';
  exitIfNoReleaseDir(releaseDir, done);

  // Check version numbers that would be created.
  console.log(
    'Running lerna version.',
    'These version numbers will not be pushed and no tags will be created,',
    'even if you answer yes to the prompt.',
  );
  execSync(
    `lerna version --conventional-commits --no-git-tag-version --no-push`,
    {cwd: releaseDir, stdio: 'inherit'},
  );

  done();
}

/**
 * Runs prepareForPublish and then checkVersions.
 * @param {Function} done Completed callback.
 * @returns {Function} Gulp task.
 */
function prepareAndCheckVersions(done) {
  return gulp.series(prepareForPublish, checkVersions)(done);
}

/**
 * Deploy all plugins to gh-pages.
 * @param {string=} repo The repo to deploy to.
 * @returns {Function} Gulp task.
 */
function deployToGhPages(repo) {
  return (done) => {
    const d = new Date();
    const m = `Deploying ${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
    ghpages.publish(
      'gh-pages',
      {
        message: m,
        repo,
        // Include .nojekyll file to tell GitHub to publish without building.
        // By default, dotfiles are excluded.
        // TODO: make the github action include .nojekyll.
        src: ['**/*', '.nojekyll'],
      },
      done,
    );
  };
}

/**
 * Prepares plugins to be tested locally.
 * @param {boolean} isBeta True if we want to test gh pages with the beta
 *     version of Blockly.
 * @returns {Function} Gulp task.
 */
function preparePluginsForLocal(isBeta) {
  return (done) => {
    if (isBeta) {
      execSync(`npm install blockly@beta --force `, {
        stdio: 'inherit',
      });
    }
    // Bundles all the plugins.
    execSync(`npm run deploy:prepare:plugins`, {stdio: 'inherit'});
    done();
  };
}

/**
 * Prepares examples to be tested locally.
 * @param {boolean} isBeta True if we want to test gh pages with the beta
 *     version of Blockly.
 * @returns {Function} Gulp task.
 */
function prepareExamplesForLocal(isBeta) {
  return (done) => {
    if (isBeta) {
      execSync(`npm install --workspace=examples blockly@beta --force`, {
        stdio: 'inherit',
      });
    }
    // Bundles any examples that define a predeploy script (ex. developer-tools).
    execSync(`npm run deploy:prepare:examples`, {stdio: 'inherit'});
    done();
  };
}

/**
 * Does all the necessary tasks to run github pages locally.
 * @param {boolean} isBeta True if we want to test gh pages with the beta
 *     version of Blockly. This is particularly helpful for testing before we
 *     release core.
 * @returns {Function} Gulp task.
 */
function testGhPagesLocally(isBeta) {
  return gulp.series(
    gulp.parallel(
      preparePluginsForLocal(isBeta),
      prepareExamplesForLocal(isBeta),
    ),
    predeployTasks.predeployAllLocal,
    function (done) {
      console.log('Starting server using http-server');
      execSync(`npx http-server`, {cwd: 'gh-pages', stdio: 'inherit'});
      done();
    },
  );
}

/**
 * Deploy all plugins to gh-pages on origin.
 * @param {Function} done Completed callback.
 * @returns {Function} Gulp task.
 */
function deployToGhPagesOrigin(done) {
  return deployToGhPages()(done);
}

/**
 * Deploy all plugins to gh-pages on upstream.
 * @param {Function} done Completed callback.
 * @returns {Function} Gulp task.
 */
function deployToGhPagesUpstream(done) {
  return deployToGhPages(
    'https://github.com/RaspberryPiFoundation/blockly-samples.git',
  )(done);
}

module.exports = {
  checkLicenses: checkLicenses,
  deploy: deployToGhPagesOrigin,
  deployUpstream: deployToGhPagesUpstream,
  predeploy: predeployTasks.predeployAll,
  prepareForPublish: prepareForPublish,
  publishManual: prepareAndPublish,
  forcePublish: prepareAndForcePublish,
  publishFromPackage: prepareAndPublishFromPackage,
  checkVersions: prepareAndCheckVersions,
  testGhPagesBeta: testGhPagesLocally(true),
  testGhPages: testGhPagesLocally(false),
};

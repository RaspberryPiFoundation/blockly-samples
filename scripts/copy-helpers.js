/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Shared filesystem copy helpers (binary-safe, no gulp streams).
 */

const fs = require('fs');
const path = require('path');

/**
 * True if the path looks like a glob pattern (not a literal file path).
 * @param {string} filePath Absolute or normalized path.
 * @returns {boolean} Whether the path contains glob metacharacters.
 */
function hasGlobPattern(filePath) {
  return /[*?[\]]/.test(filePath);
}

/**
 * Expand a glob pattern to matching paths. Prefer Node's `fs.globSync` (Node
 * 22+); older Node uses the `glob` package (pulled in by gulp).
 * @param {string} pattern Absolute path that may contain glob metacharacters.
 * @returns {!Array<string>} Matching paths from the filesystem.
 */
function expandGlob(pattern) {
  if (typeof fs.globSync === 'function') {
    return fs.globSync(pattern);
  }
  return require('glob').sync(pattern);
}

/**
 * Expand `blocklyDemoConfig.files`-style entries to concrete paths.
 * @param {!Array<string>} sources Paths relative to cwd or absolute.
 * @returns {!Array<string>} Absolute paths to files (directories skipped).
 */
function expandSourcePaths(sources) {
  const out = [];
  for (const src of sources) {
    const resolved = path.resolve(src);
    if (!hasGlobPattern(resolved)) {
      out.push(resolved);
      continue;
    }
    const matches = expandGlob(resolved);
    for (const m of matches) {
      if (fs.existsSync(m) && fs.statSync(m).isFile()) {
        out.push(m);
      }
    }
  }
  return out;
}

/**
 * Copy files under baseDir into destRoot, preserving directory structure
 * relative to baseDir. Skips missing sources.
 * Uses fs.copyFileSync so binary files are not corrupted.
 * Glob patterns in `sources` are expanded.
 * @param {!Array<string>} sources Source file paths (may include globs).
 * @param {string} baseDir Base directory (e.g. 'examples' or 'plugins').
 * @param {string} destRoot Destination root (e.g. 'gh-pages/examples').
 */
function copyFilesWithBase(sources, baseDir, destRoot) {
  const baseResolved = path.resolve(baseDir);
  const destRootResolved = path.resolve(destRoot);
  const sourceFiles = expandSourcePaths(sources);
  for (const srcPath of sourceFiles) {
    if (!fs.existsSync(srcPath)) {
      continue;
    }
    if (!fs.statSync(srcPath).isFile()) {
      continue;
    }
    const rel = path.relative(baseResolved, path.resolve(srcPath));
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      throw new Error(
        `Source ${srcPath} is not under base directory ${baseDir}`,
      );
    }
    const destPath = path.join(destRootResolved, rel);
    fs.mkdirSync(path.dirname(destPath), {recursive: true});
    fs.copyFileSync(srcPath, destPath);
  }
}

/**
 * Copy a directory tree into dest. If dest already exists as a directory,
 * the contents of src are merged/copied into it.
 * No-op if src does not exist. Binary-safe.
 * @param {string} src Source directory path.
 * @param {string} dest Destination directory path.
 * @returns {!Promise<void>} Resolves when the copy completes.
 */
async function copyDirectoryContents(src, dest) {
  try {
    await fs.promises.access(src);
  } catch {
    return;
  }
  await fs.promises.mkdir(dest, {recursive: true});
  await fs.promises.cp(src, dest, {recursive: true});
}

module.exports = {
  copyFilesWithBase,
  copyDirectoryContents,
};

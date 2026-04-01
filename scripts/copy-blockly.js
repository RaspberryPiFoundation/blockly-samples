#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const {copyDirectoryContents} = require('./copy-helpers');

(async () => {
  const destRoot = path.resolve(__dirname, '..', 'examples', 'lib');
  const blocklyRoot = path.join(destRoot, 'blockly');
  // Clear out the examples/lib directory before copying
  try {
    await fs.rm(destRoot, {recursive: true, force: true});
    await fs.mkdir(destRoot, {recursive: true});
    console.log('Cleared examples lib directory:', destRoot);
  } catch (e) {
    console.warn('Failed to clear examples lib directory:', e.message);
  }
  try {
    // Resolve package root by locating package.json upwards from the package entry.
    const entryPath = require.resolve('blockly');
    let dir = path.dirname(entryPath);
    let blocklyDir = null;
    while (dir && dir !== path.parse(dir).root) {
      try {
        const pkg = JSON.parse(
          await fs.readFile(path.join(dir, 'package.json'), 'utf8'),
        );
        if (pkg && pkg.name === 'blockly') {
          blocklyDir = dir;
          break;
        }
      } catch (e) {
        // not a package root here
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
    if (!blocklyDir) throw new Error('Could not locate blockly package root');

    console.log('Copying Blockly from', blocklyDir, 'to', blocklyRoot);

    // Copy the entire blockly package into destRoot (preserves README, dist, msg, media, etc.)
    try {
      await copyDirectoryContents(blocklyDir, blocklyRoot);
      console.log('Blockly copied to', blocklyRoot);
    } catch (e) {
      console.error('Failed to copy Blockly package:', e);
    }

    // Also copy local workspace plugins from the `plugins/` directory (this repo).
    try {
      const pluginsDir = path.resolve(__dirname, '..', 'plugins');
      const pluginDirs = await fs.readdir(pluginsDir, {withFileTypes: true});
      const copiedLocal = [];
      for (const d of pluginDirs) {
        if (!d.isDirectory()) continue;
        try {
          const pkgJson = JSON.parse(
            await fs.readFile(
              path.join(pluginsDir, d.name, 'package.json'),
              'utf8',
            ),
          );
          if (pkgJson && pkgJson.name && pkgJson.name.startsWith('@blockly/')) {
            const shortName = pkgJson.name.split('/')[1];
            const src = path.join(pluginsDir, d.name);
            const dest = path.join(destRoot, '@blockly', shortName);
            const srcDist = path.join(src, 'dist');
            try {
              let distExists = false;
              try {
                const s = await fs.stat(srcDist);
                distExists = s && s.isDirectory();
              } catch (e) {
                distExists = false;
              }
              if (distExists) {
                await copyDirectoryContents(srcDist, path.join(dest, 'dist'));
                copiedLocal.push(shortName);
                console.log(
                  `Copied local @blockly/${shortName}/dist to ${path.join(
                    dest,
                    'dist',
                  )}`,
                );
              } else {
                // Do not copy full plugin source when no dist/ exists — warn and skip.
                console.warn(
                  `Skipping local @blockly/${shortName}: no dist/ directory found to copy`,
                );
              }
            } catch (e) {
              console.warn(
                `Failed to copy local plugin @blockly/${shortName}: ${e.message}`,
              );
            }
          }
        } catch (e) {
          // ignore directories without package.json
        }
      }
      if (copiedLocal.length === 0) {
        console.log('No local @blockly plugins found to copy from plugins/');
      } else {
        console.log('Copied local @blockly plugins:', copiedLocal.join(', '));
      }
    } catch (e) {
      // No plugins directory, or read failure
    }
  } catch (err) {
    console.error('Error copying Blockly:', err);
    process.exit(1);
  }
})();

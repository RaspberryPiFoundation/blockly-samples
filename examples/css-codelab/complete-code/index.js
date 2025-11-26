'use strict';

let workspace = null;

function start() {
  // Create main workspace.
  const nullTheme = Blockly.Theme.defineTheme('nullTheme', {});
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolboxCategories,
    theme: nullTheme,
    renderer: 'thrasos',
  });
}

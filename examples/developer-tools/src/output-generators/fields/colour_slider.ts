/**
 * @license
 * Copyright 2026 Raspberry Pi Foundation
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';
import {
  JsonDefinitionGenerator,
  jsonDefinitionGenerator,
} from '../json_definition_generator';
import {
  JavascriptDefinitionGenerator,
  javascriptDefinitionGenerator,
} from '../javascript_definition_generator';
import {
  CodeHeaderGenerator,
  importHeaderGenerator,
  scriptHeaderGenerator,
} from '../code_header_generator';
import {
  GeneratorStubGenerator,
  generatorStubGenerator,
} from '../generator_stub_generator';

jsonDefinitionGenerator.forBlock['field_colour_slider'] = function (
  block: Blockly.Block,
  generator: JsonDefinitionGenerator,
): string {
  const code = {
    type: 'field_colour_hsv_sliders',
    name: block.getFieldValue('FIELDNAME'),
    colour: block.getFieldValue('COLOUR'),
  };
  return JSON.stringify(code);
};

javascriptDefinitionGenerator.forBlock['field_colour_slider'] = function (
  block: Blockly.Block,
  generator: JavascriptDefinitionGenerator,
): string {
  const name = generator.quote_(block.getFieldValue('FIELDNAME'));
  const colour = generator.quote_(block.getFieldValue('COLOUR'));
  return `.appendField(new FieldColourHsvSliders(${colour}), ${name})`;
};

importHeaderGenerator.forBlock['field_colour_slider'] = function (
  block: Blockly.Block,
  generator: CodeHeaderGenerator,
): string {
  generator.addHeaderLine(
    `import {FieldColourHsvSliders} from '@blockly/field-colour-hsv-sliders';`,
  );
  return '';
};

scriptHeaderGenerator.forBlock['field_colour_slider'] = function (
  block: Blockly.Block,
  generator: CodeHeaderGenerator,
): string {
  generator.addHeaderLine(
    `<script src="https://unpkg.com/@blockly/field-colour-hsv-sliders"></script>`,
  );
  return '';
};

generatorStubGenerator.forBlock['field_colour_slider'] = function (
  block: Blockly.Block,
  generator: GeneratorStubGenerator,
): string {
  const name = block.getFieldValue('FIELDNAME');
  const fieldVar = generator.createVariableName('colour', name);
  return `const ${fieldVar} = block.getFieldValue(${generator.quote_(
    name,
  )});\n`;
};

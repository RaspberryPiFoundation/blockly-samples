/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {FieldAngle} from '@blockly/field-angle';
import {FieldColourHsvSliders} from '@blockly/field-colour-hsv-sliders';

/**
 * A hue-picker to set the colour of a block.
 */
export const colourHue = {
  init: function () {
    this.appendDummyInput()
      .appendField('hue:')
      .appendField(new FieldAngle('0', this.updateBlockColour), 'HUE');
    this.setOutput(true, 'Colour');
    this.setTooltip('Paint the block with this colour.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=55');
  },
  updateBlockColour: function (hue: number) {
    this.getSourceBlock().setColour(hue);
  },
};

export const colorHsv = {
  init: function () {
    this.appendDummyInput()
      .appendField('hsv:')
      .appendField(new BorderHsvSliders('#ff0000'), 'COLOUR');
    this.setOutput(true, 'Colour');
    this.setTooltip('Paint the block with this colour.');
    this.setColour('#5ba593');
  },
};

class BorderHsvSliders extends FieldColourHsvSliders {
  override initView() {
    super.initView();
    this.getBorderRect().style.stroke = '#ffffff';
    this.getBorderRect().style.strokeWidth = '1px';
  }
}

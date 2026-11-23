/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Input',
      categorystyle: 'input',
      contents: [
        {
          kind: 'block',
          type: 'input',
          fields: {
            INPUTTYPE: 'input_value',
          },
        },
        {
          kind: 'block',
          type: 'input',
          fields: {
            INPUTTYPE: 'input_statement',
          },
        },
        {
          kind: 'block',
          type: 'input',
          fields: {
            INPUTTYPE: 'input_dummy',
          },
        },
        {
          kind: 'block',
          type: 'input',
          fields: {
            INPUTTYPE: 'input_end_row',
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Fields',
      categorystyle: 'field',
      contents: [
        {
          kind: 'block',
          type: 'field_label',
        },
        {
          kind: 'block',
          type: 'field_label_serializable',
        },
        {
          kind: 'block',
          type: 'field_input',
        },
        {
          kind: 'block',
          type: 'field_number',
        },
        {
          kind: 'block',
          type: 'field_dropdown',
        },
        {
          kind: 'block',
          type: 'field_checkbox',
        },
        {
          kind: 'block',
          type: 'field_variable',
        },
        {
          kind: 'block',
          type: 'field_image',
        },
        {
          kind: 'block',
          type: 'field_angle',
        },
        {
          kind: 'block',
          type: 'field_colour',
        },
        {
          kind: 'block',
          type: 'field_colour_slider',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Connection Checks',
      categorystyle: 'connectionCheck',
      contents: [
        {
          kind: 'block',
          type: 'connection_check_group',
        },
        {
          kind: 'block',
          type: 'connection_check',
          fields: {
            CHECKDROPDOWN: 'null',
          },
        },
        {
          kind: 'block',
          type: 'connection_check',
          fields: {
            CHECKDROPDOWN: 'Boolean',
          },
        },
        {
          kind: 'block',
          type: 'connection_check',
          fields: {
            CHECKDROPDOWN: 'Number',
          },
        },
        {
          kind: 'block',
          type: 'connection_check',
          fields: {
            CHECKDROPDOWN: 'String',
          },
        },
        {
          kind: 'block',
          type: 'connection_check',
          fields: {
            CHECKDROPDOWN: 'Array',
          },
        },
        {
          kind: 'block',
          type: 'connection_check',
          fields: {
            CHECKDROPDOWN: 'CUSTOM',
            CUSTOMCHECK: 'custom check',
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Colour',
      categorystyle: 'colour',
      contents: [
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#a56d5b'},
        }, // hue 15
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#a5a55b'},
        }, // hue 60
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#5ba55b'},
        }, // hue 120
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#5ba593'},
        }, // hue 165
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#5b80a5'},
        }, // hue 210
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#5b6da5'},
        }, // hue 225
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#6d5ba5'},
        }, // hue 255
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#935ba5'},
        }, // hue 285
        {
          kind: 'block',
          type: 'colour_hsv_sliders',
          fields: {COLOUR: '#a55b80'},
        }, // hue 330
        {
          kind: 'block',
          type: 'colour_hue',
          fields: {
            HUE: 20,
          },
        },
      ],
    },
  ],
};

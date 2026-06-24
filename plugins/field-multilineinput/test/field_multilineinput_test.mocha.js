/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const {testHelpers} = require('@blockly/dev-tools');
const {
  FieldMultilineInput,
  registerFieldMultilineInput,
} = require('../src/index');
const {assert} = require('chai');
const sinon = require('sinon');

const {
  assertFieldValue,
  FieldCreationTestCase,
  FieldValueTestCase,
  runConstructorSuiteTests,
  runFromJsonSuiteTests,
  runSetValueTests,
} = testHelpers;

suite('FieldMultilineInput', function () {
  setup(function () {
    registerFieldMultilineInput();
  });
  /**
   * Configuration for field tests with invalid values.
   * @type {Array<FieldCreationTestCase>}
   */
  const invalidValueTestCases = [
    {title: 'Undefined', value: undefined},
    {title: 'Null', value: null},
  ];
  /**
   * Configuration for field tests with valid values.
   * @type {Array<FieldCreationTestCase>}
   */
  const validValueTestCases = [
    {title: 'Empty string', value: '', expectedValue: ''},
    {title: 'String no newline', value: 'value', expectedValue: 'value'},
    {
      title: 'String with newline',
      value: 'bark bark\n bark bark bark\n bark bar bark bark\n',
      expectedValue: 'bark bark\n bark bark bark\n bark bar bark bark\n',
    },
    {title: 'Boolean true', value: true, expectedValue: 'true'},
    {title: 'Boolean false', value: false, expectedValue: 'false'},
    {title: 'Number (Truthy)', value: 1, expectedValue: '1'},
    {title: 'Number (Falsy)', value: 0, expectedValue: '0'},
    {title: 'NaN', value: NaN, expectedValue: 'NaN'},
  ];
  const addArgsAndJson = function (testCase) {
    testCase.args = [testCase.value];
    testCase.json = {text: testCase.value};
  };
  invalidValueTestCases.forEach(addArgsAndJson);
  validValueTestCases.forEach(addArgsAndJson);

  /**
   * The expected default value for the field being tested.
   * @type {*}
   */
  const defaultFieldValue = '';
  /**
   * Asserts that the field property values are set to default.
   * @param {!FieldMultilineInput} field The field to check.
   */
  const assertFieldDefault = function (field) {
    assertFieldValue(field, defaultFieldValue);
  };

  /**
   * Asserts that the field properties are correct based on the test case.
   * @param {FieldMultilineInput} field The field to check.
   * @param {FieldValueTestCase} testCase The test case.
   */
  const validTestCaseAssertField = function (field, testCase) {
    assertFieldValue(field, testCase.expectedValue);
  };

  runConstructorSuiteTests(
    FieldMultilineInput,
    validValueTestCases,
    invalidValueTestCases,
    validTestCaseAssertField,
    assertFieldDefault,
  );

  runFromJsonSuiteTests(
    FieldMultilineInput,
    validValueTestCases,
    invalidValueTestCases,
    validTestCaseAssertField,
    assertFieldDefault,
  );

  suite('setValue', function () {
    suite('Empty -> New Value', function () {
      setup(function () {
        this.field = new FieldMultilineInput();
      });
      runSetValueTests(
        validValueTestCases,
        invalidValueTestCases,
        defaultFieldValue,
      );
    });
    suite('Value -> New Value', function () {
      const initialValue = 'oldValue';
      setup(function () {
        this.field = new FieldMultilineInput(initialValue);
      });
      runSetValueTests(
        validValueTestCases,
        invalidValueTestCases,
        initialValue,
      );
    });
  });

  suite('Keyboard behavior', function () {
    setup(function () {
      this.jsdomCleanup = require('jsdom-global')('');
      this.field = new FieldMultilineInput('hello');
      this.textarea = document.createElement('textarea');
      this.textarea.value = 'hello';
      this.textarea.selectionStart = 5;
      this.textarea.selectionEnd = 5;
      this.field.htmlInput_ = this.textarea;
      this.superStub = sinon.stub(
        Blockly.FieldTextInput.prototype,
        'onHtmlInputKeyDown_',
      );
    });

    teardown(function () {
      sinon.restore();
      this.jsdomCleanup();
    });

    test('Enter calls super to commit the value', function () {
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        ctrlKey: false,
        metaKey: false,
      });
      this.field.onHtmlInputKeyDown_(event);
      assert.isTrue(this.superStub.calledOnce);
    });

    test('Shift+Enter inserts a newline without committing', function () {
      this.textarea.value = 'hello';
      this.textarea.selectionStart = 3;
      this.textarea.selectionEnd = 3;
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        shiftKey: true,
      });
      this.field.onHtmlInputKeyDown_(event);
      assert.isFalse(this.superStub.called, 'super should not be called');
      assert.equal(this.textarea.value, 'hel\nlo');
      assert.equal(this.textarea.selectionStart, 4);
    });

    test('Enter during IME composition does not commit or insert newline', function () {
      this.textarea.value = 'hello';
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        ctrlKey: false,
        metaKey: false,
        isComposing: true,
      });
      this.field.onHtmlInputKeyDown_(event);
      assert.isFalse(this.superStub.called, 'super should not be called');
      assert.equal(this.textarea.value, 'hello', 'value should be unchanged');
    });

    test('Non-Enter keys call super', function () {
      const event = new KeyboardEvent('keydown', {key: 'Escape'});
      this.field.onHtmlInputKeyDown_(event);
      assert.isTrue(this.superStub.calledOnce);
    });

    test('insertNewline_ splices a newline at the cursor', function () {
      this.textarea.value = 'hello world';
      this.textarea.selectionStart = 5;
      this.textarea.selectionEnd = 5;
      this.field['insertNewline_']();
      assert.equal(this.textarea.value, 'hello\n world');
      assert.equal(this.textarea.selectionStart, 6);
    });

    test('insertNewline_ replaces a selection with a newline', function () {
      this.textarea.value = 'hello world';
      this.textarea.selectionStart = 5;
      this.textarea.selectionEnd = 11;
      this.field['insertNewline_']();
      assert.equal(this.textarea.value, 'hello\n');
      assert.equal(this.textarea.selectionStart, 6);
    });

    suite('enterCommits = false (swapped mode)', function () {
      setup(function () {
        FieldMultilineInput.enterCommits = false;
        this.textarea.value = 'hello';
        this.textarea.selectionStart = 3;
        this.textarea.selectionEnd = 3;
      });

      teardown(function () {
        FieldMultilineInput.enterCommits = true;
      });

      test('plain Enter inserts a newline and does not call super', function () {
        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
          ctrlKey: false,
          metaKey: false,
        });
        this.field.onHtmlInputKeyDown_(event);
        assert.isFalse(this.superStub.called, 'super should not be called');
        assert.equal(this.textarea.value, 'hel\nlo');
      });

      test('Shift+Enter calls super to commit and does not modify value', function () {
        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
          shiftKey: true,
        });
        this.field.onHtmlInputKeyDown_(event);
        assert.isTrue(this.superStub.calledOnce, 'super should be called');
        assert.equal(this.textarea.value, 'hello', 'value should be unchanged');
      });
    });

    suite('FieldMultilineInput.enterCommits (global)', function () {
      teardown(function () {
        FieldMultilineInput.enterCommits = true;
      });

      test('defaults to true', function () {
        assert.isTrue(FieldMultilineInput.enterCommits);
      });

      test('can be set to false globally', function () {
        FieldMultilineInput.enterCommits = false;
        assert.isFalse(FieldMultilineInput.enterCommits);
      });
    });
  });

  suite('FieldMultilineInput.showHint (global)', function () {
    teardown(function () {
      FieldMultilineInput.showHint = true;
    });

    test('defaults to true', function () {
      assert.isTrue(FieldMultilineInput.showHint);
    });

    test('can be set to false globally', function () {
      FieldMultilineInput.showHint = false;
      assert.isFalse(FieldMultilineInput.showHint);
    });
  });

  suite('Serialization', function () {
    setup(function () {
      this.workspace = new Blockly.Workspace();
      Blockly.defineBlocksWithJsonArray([
        {
          type: 'row_block',
          message0: '%1',
          args0: [
            {
              type: 'input_value',
              name: 'INPUT',
            },
          ],
          output: null,
        },
      ]);

      this.assertValue = (value) => {
        const block = this.workspace.newBlock('row_block');
        const field = new FieldMultilineInput(value);
        block.getInput('INPUT').appendField(field, 'MULTILINE');
        const jso = Blockly.serialization.blocks.save(block);
        assert.deepEqual(jso['fields'], {MULTILINE: value});
      };
    });

    teardown(function () {
      this.workspace.dispose();
    });

    test('Single line', function () {
      this.assertValue('this is a single line');
    });

    test('Multiple lines', function () {
      this.assertValue('this\nis\n  multiple\n    lines');
    });
  });
});

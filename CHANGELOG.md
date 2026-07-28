# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [13.2.0](https://github.com/RaspberryPiFoundation/blockly-samples/compare/v13.1.0...v13.2.0) (2026-07-28)

### Features

* **field-bitmap:** make the bitmap editor keyboard and screen-reader accessible ([#2754](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2754))
* **field-grid-dropdown:** wrap vertical keyboard focus across columns

### Bug Fixes

* **block-dynamic-connection:** recache connection pairs after dynamically adding new ones
* **field-grid-dropdown:** announce as a grid popup instead of a listbox
* FieldGridDropdown recomputeAriaContext no longer throws an error ([#2741](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2741))
* Fix positioning of dropdown on full-block color fields ([#2747](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2747))
* Improve accessibility of colour slider plugin ([#2745](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2745))
* Minimap variable renaming ([#2756](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2756))
* **workspace-search:** set search buttons to type='button'
* Wrong code generation for FieldImage ([#2755](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2755))


## [13.1.0](https://github.com/RaspberryPiFoundation/blockly-samples/compare/v13.0.0...v13.1.0) (2026-06-30)

### ⚠ BREAKING CHANGES

* make field-multilineinput keyboard navigable and accessible (#2729)
* Add ARIA labels for block-plus-minus (#2696)
* Bump Blockly dependency to v13 (#2704)

### Features

* fix keyboard nav for minimap ([#2730](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2730))
* make field-multilineinput keyboard navigable and accessible ([#2729](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2729))

### Bug Fixes

* Add ARIA labels for block-plus-minus ([#2696](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2696))
* Fix block-test under v13 ([#2714](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2714))
* Fix bug that caused focus to move to parent block when vivifying a shadow ([#2726](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2726))
* Fix chaotic glitchiness when using scroll options with keyboard moves ([#2732](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2732))
* Fix JSDom whinging about its default stylesheet ([#2700](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2700))
* Fix keyboard navigation for the continuous toolbox ([#2690](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2690))
* Fix minimap plugin under v13 ([#2702](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2702))
* Fix strict connection checker tests ([#2703](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2703))
* Fix the tests for block-dynamic-connection ([#2705](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2705))
* Fix the workspace-search plugin tests ([#2706](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2706))
* Fix typed-variable-modal build and tests ([#2701](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2701))
* Improve accessibility of `FieldAngle` ([#2697](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2697))
* Improve accessibility of `FieldDate` ([#2698](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2698))
* Improve accessibility of grid and colour fields ([#2724](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2724))
* Improve accessibility of toolbox search ([#2713](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2713))
* Improve keyboard accessibility of slider field ([#2727](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2727))
* Improve the keyboard and screenreader accessibility of the backpack ([#2731](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2731))
* Make zoom to fit plugin keyboard and screenreader accessible ([#2728](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2728))
* Remove deprecated calls from block-shareable-procedures ([#2699](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2699))
* wrap sample app eval in try/catch ([#2733](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2733))

### Miscellaneous Chores

* Bump Blockly dependency to v13 ([#2704](https://github.com/RaspberryPiFoundation/blockly-samples/issues/2704))

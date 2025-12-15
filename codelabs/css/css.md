author: Blockly Team summary: How to use CSS in Blockly. id: css-identifier
categories: blockly,codelab,css status: Published feedback link:
https://github.com/google/blockly-samples/issues/new/choose

# Use CSS in Blockly

## Codelab overview

### What you'll learn

In this codelab you will learn how to use CSS to customize the colours of:

-   Components
-   Categories
-   Blocks

### What you'll build

A simple Blockly workspace that uses the same Halloween colours as the
[Customizing your themes](https://blocklycodelabs.dev/codelabs/theme-extension-identifier/index.html#0)
codelab.

### What you'll need

-   A browser
-   Basic knowledge of HTML, CSS, SVG, and JavaScript.
-   Basic knowledge of your browser's developer tools.
-   Basic understanding of Blockly, including workspace components, category
    toolboxes, block definitions, and themes.

This codelab is focused on using CSS with Blockly. Non-relevant concepts are
glossed over and provided for you to simply copy and paste.

## Setup

### Download the sample code

You can get the sample code for this code by either downloading the zip here:

[Download zip](https://github.com/RaspberryPiFoundation/blockly-samples/archive/master.zip)

or by cloning this git repo:

```bash
git clone https://github.com/RaspberryPiFoundation/blockly-samples.git
```

If you downloaded the source as a zip, unpacking it should give you a root
folder named `blockly-samples-master`.

The relevant files are in `examples/css-codelab`. There are two versions of the
app:

-   `starter-code/`: The starter code that you'll build upon in this codelab.
-   `complete-code/`: The code after completing the codelab, in case you get
    lost or want to compare to your version.

Each folder contains:

-   `index.html` - A web page containing a simple Blockly workspace.
-   `toolbox.js` - A toolbox with multiple categories.
-   `index.js` - Code to inject a simple workspace.

The `complete-code` folder also contains the `halloween.css` file you'll create.

To run the code, simply open `starter-code/index.html` in a browser. You should
see a Blockly workspace with multiple categories.

![A web page with the text "CSS Codelab" and a Blockly editor with seven
categories.](setup-starter.png)

## A tour of Blockly's elements

In this section, you'll explore the HTML and SVG elements used by Blockly, as
well as the classes assigned to these elements.

In your Blockly editor, drag a `count with` block from the **Loops** category
and an `if do` block from the **Logic** category onto your workspace and open
your browser's
[developer tools](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools).
Your screen should look something like this:

![A Blockly editor with two blocks on the workspace and the developer tools
open.](tour-dev-tools.png)

Using the element inspector, explore the elements used by Blockly. For example,
see if you can find the SVG `<path>` element used to draw the `count with`
block. If you're having trouble finding things, the following outline might
help. (Note that it omits some elements and most attributes.)

```
Description                      DOM elements
-------------------------------  ----------------------------------------------
<body> element                   <body>
  App-specific container           <div id="blocklyDiv">
    Injection element                <div class="injectionDiv">
      Toolbox                          <div class="blocklyToolbox">
      Main SVG element                 <svg class="blocklySvg">
        Main workspace                   <g class="blocklyWorkspace">
          Trash                            <g class="blocklyTrash">
          Block canvas                     <g class="blocklyBlockCanvas">
            Block 1                          <g class="controls_for">
              <path> element                   <path class="blocklyPath">
              Child block 1                    <g class="math_number">
              Child block 2                    <g class="math_number">
              ...                              ...
              Field 1                          <g class="blocklyLabelField">
              Field 2                          <g class="blocklyDropdownField">
              ...                              ...
            Block 2                          <g class="controls_if">
          Bubble canvas                    <g class="blocklyBubbleCanvas">
          Scrollbar background             <rect class="blocklyScrollbarBackground">
      Scrollbars, flyouts, etc.        <svg>s
  Widget, dropdown, tooltip divs   <div>s
```

One thing that's important to notice are the `blocklyXxxx` classes assigned to
most elements. These explain how Blockly uses each element and will be the
targets of many of your CSS rules. If you look closely, you'll notice that many
elements have multiple classes -- for example, the `<g>` element for the
dropdown field in the `counts with` block has `blocklyField`,
`blocklyDropdownField`, `blocklyVariableField`, and `blocklyEditableField`
classes. Having multiple classes allows you to write CSS rules that affect
different ranges of elements.

## Components

In this section, you will create CSS rules to assign the colours used by the
[components section](https://blocklycodelabs.dev/codelabs/theme-extension-identifier/index.html#3)
of the themes codelab to various components.

To start, create a file named `halloween.css` and add it to your `index.html`
file:

```html
    ...
    <script src="./index.js"></script>
    <link rel="stylesheet" href="halloween.css" />
```

### Main workspace colour

Your first rule will set the background colour of the main workspace. In your
Blockly editor, find the `<rect>` element with the `blocklyMainBackground`
class:

```
<body>
  <div class="blocklyDiv">
    <div class="injectionDiv">
      <svg class="blocklySvg">
        <g class="blocklyWorkspace">
          <rect class="blocklyMainBackground">
```

This seems like a good target for your rule, except that the `fill` property is
already used to set the grid pattern. Instead, we'll set the `background-color`
property of the `blocklySvg` element. To do this, add the following rule to
`halloween.css`:

```css
/**************/
/* COMPONENTS */
/**************/

.blocklySvg {
  background-color: #ff7518;
}
```

Refresh your page and notice that the workspace background is now orange:

![A Blockly editor with an orange workspace.](components-workspace.png)

### Mutator workspace colour

Now drag an `if do` block onto the workspace and click the mutator (gear) icon.
Notice that the mutator workspace's background colour is unchanged. This is
because it's a different workspace. See if you can find the `<rect>` that draws
the mutator workspace. (Here's a hint: It's on the bubble canvas, which is where
the bubbles used by mutators, comments, and warnings are drawn.)

Don't worry if you didn't find it right away -- Blockly's DOM tree is fairly
complex:

```
<body>
  <div class="blocklyDiv">
    <div class="injectionDiv">
      <svg class="blocklySvg">
        <g class="blocklyWorkspace">
          <g class="blocklyBubbleCanvas">
            <g class="blocklyMiniWorkspaceBubble">
              <g>
                <svg>
                  <g class="blocklyWorkspace">
                    <rect class="blocklyMutatorBackground">
```

Next, add a CSS rule to set the workspace's background colour:

```css
.blocklyMutatorBackground {
  fill: #ff7518;
}
```

To see your new colours, reload the web page, drag the `if do` block out again,
and reopen the mutator. You should see that the mutator workspace background
colour is orange, matching the main workspace background:

![An "if do" block with a mutator that has an orange background.](components-mutator.png)

### Other component colours

Themes allow you to define the colours of many (but not all) components. The
following table shows what classes and properties to use to set the same colours
as the component styles in themes:

| Component style             | Selectors (properties)                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `workspaceBackgroundColour` | `.blocklySvg (background-color)`, `.blocklyMutatorBackground (fill)`                                 |
| `toolboxBackgroundColour`   | `.blocklyToolbox (background-color)`                                                                 |
| `toolboxForegroundColour`   | `.blocklyToolbox (color)`                                                                            |
| `flyoutBackgroundColour`    | `.blocklyFlyoutBackground (fill)`                                                                    |
| `flyoutForegroundColour`    | `.blocklyFlyoutLabel > .blocklyFlyoutLabelText (fill)`, `.blocklyFlyoutButton > .blocklyText (fill)` |
| `flyoutOpacity`             | `.blocklyFlyoutBackground (fill-opacity)`                                                            |
| `scrollbarColour`           | `.blocklyScrollbarHandle (fill)`                                                                     |
| `scrollbarOpacity`          | `.blocklyScrollbarHandle (fill-opacity)`                                                             |
| `insertionMarkerColour`     | `.blocklyInsertionMarker > .blocklyPath (fill)`                                                      |
| `insertionMarkerOpacity`    | `.blocklyInsertionMarker > .blocklyPath (fill-opacity)`                                              |

Add the following rules to `halloween.css`:

```css
.blocklyToolbox {
  background-color: #f9c10e;
  color: #fff;
}

.blocklyFlyoutBackground {
  fill: #252526;
  fill-opacity: 1;
}

.blocklyFlyoutLabel > .blocklyFlyoutLabelText {
  fill: #ccc !important;
}

.blocklyFlyoutButton > .blocklyText {
  fill: #ccc !important;
}

.blocklyScrollbarHandle {
  fill: #ff0000;
  fill-opacity: 0.4;
}

.blocklyInsertionMarker > .blocklyPath {
  fill: #fff !important;
  fill-opacity: 0.3 !important;
  stroke: none;
}
```

Now reload your page. You should see a Blockly editor with a yellow toolbox and
red scrollbars:

![A Blockly editor with Halloween colors.](components-halloween.png)

### fill vs background-color

You might have noticed that some rules use `background-color` and `color` and
others use `fill` and `stroke`. This is because `background-color` and `color`
apply to HTML elements, like the `<div>` used by the toolbox, and `fill` and
`stroke` apply to most SVG elements, like the `<path>` used by the flyout
background. (An exception to this is the top-level <svg> element that contains
Blockly, which uses `background-color` and `color`.)

### The !important declaration

You might have also noticed that some rules use an `!important` declaration
while others don't. This is because Blockly sets colours in several different
ways, some of which are easily overridden and some of which aren't.

*   **Presentation attributes:** These are attributes on SVG elements, such as
    `fill` and `stroke`. They have a specificity of 0 and are overridden by any
    rules you write. As you will see later, block colours use presentation
    attributes.

*   **`<style>` tags:** Many of Blockly's CSS rules are included via two
    `<style>` tags at the start of the `<head>` tag. Your rules override these
    if they have the same or higher specificity. For example, the rule for
    `.blocklyScrollbarHandle` has the same specificity as Blockly's rule for
    this class, but overrides Blockly's rule because it occurs later in the
    document. On the other hand, the rule for
    `.blocklyFlyoutLabel > .blocklyFlyoutLabelText` has a lower specificity than
    Blockly's rule and must override it with an `!important` declaration.

*   **Inline styles:** These rules are included via a `style` attribute and can
    only be overridden by an `!important` declaration. As you will see later,
    the colour of the arrow in a dropdown field is set with an inline style and
    must be overridden with `!important`.

The easiest way to determine how a rule is set is to highlight the appropriate
element in the element inspector and look at the corresponding style
information. In a few cases, this isn't possible. For example, an insertion
marker is created only when you drag a child near its parent and is deleted when
you let go of the parent to highlight the insertion marker's element. In these
cases, you will need to
[search Blockly's rules](https://developers.google.com/blockly/guides/configure/web/appearance/css#blockly_css_rules).

## Toolbox categories

In this section, you will create CSS rules to assign the colours used by the
[categories section](https://blocklycodelabs.dev/codelabs/theme-extension-identifier/index.html#4)
of the themes codelab to the toolbox's categories.

### Identify the category element

Your first rule will set the colour of the **Logic** category. This rule needs
to uniquely identify the element used by the **Logic** category, so open the
developer tools and find the `blocklyToolboxCategory` `<div>` for the **Logic**
category:

```
<body>
  <div class="blocklyDiv">
    <div class="injectionDiv">
      <div class="blocklyToolbox">
        <div class="blocklyToolboxCategoryGroup">
          <div class="blocklyToolboxCategoryContainer">
            <div class="blocklyToolboxCategory" id="blockly-1">
```

Unfortunately, the only thing that distinguishes this `<div>` from other
category `<div>`s is a generated `id` attribute (`blockly-1`). This isn't stable
enough to use in a CSS rule -- for example, if you switched the order of two
categories you'd also have to switch the selectors in their rules.

To solve this problem, you'll need to add a class to the
`blocklyToolboxCategory` `<div>` for the **Logic** category. Open the
`toolbox.js` file and find the definition of the **Logic** category:

```js
    {
      kind: 'category',
      name: 'Logic',
      categorystyle: 'logic_category',
      contents: [...],
    },
```

The `categorystyle` property assigns a style that is used by a theme. Because
you're not using themes to assign category colours, you don't need the
`categorystyle` property. Delete it and add a `cssConfig` property that adds two
classes to the **Logic** category's `<div>`: `logic_category` uniquely
identifies the `<div>` and `blocklyToolboxCategory` is used by Blockly's CSS to
define rules that apply to all categories.

```js
    {
      kind: 'category',
      name: 'Logic',
      cssConfig: {
        row: 'blocklyToolboxCategory logic_category',
      },
      contents: [...],
    },
```

For a complete explanation of how `cssConfig` works, see
[Custom CSS classes](https://developers.google.com/blockly/guides/configure/web/toolboxes/appearance#custom_css_classes)
in the toolbox documentation.

### Add your rules

Next, add the following rules, which set the row colour and its colour when
selected:

```css
/**************/
/* CATEGORIES */
/**************/

.logic_category {
  border-left: 8px solid #8b4513;
}

.logic_category.blocklyToolboxSelected {
  background-color: #8b4513 !important;
}
```

Refresh your web page and click the **Logic** category. The row is highlighted
with your new colour:

![A Blockly editor with the Logic category open. The category name is written in
white on a brown background.](categories-logic.png)

### Update the other categories

Before you can write rules for the remaining categories, you need to replace
`categorystyle` with `cssConfig` in each of their definitions:

```js
    {
      kind: 'category',
      name: 'Loops',
      cssConfig: {
        row: 'blocklyToolboxCategory loop_category',
      },
      contents: [...],
    },

    // Repeat for remaining categories
```

Next, add the following rules to `halloween.css`. These rules use the colours
from themes codelab for the **Loops**, **Text**, and **Lists** categories and
the colours from the Classic theme (the default theme) for the **Math**,
**Variables**, and **Functions** categories.

```css
.loop_category {
  border-left: 8px solid #85e21f;
}

.loop_category.blocklyToolboxSelected {
  background-color: #85e21f !important;
}

.math_category {
  border-left: 8px solid #5b67a5;
}

.math_category.blocklyToolboxSelected {
  background-color: #5b67a5 !important;
}

.text_category {
  border-left: 8px solid #fe9b13;
}

.text_category.blocklyToolboxSelected {
  background-color: #fe9b13 !important;
}

.list_category {
  border-left: 8px solid #4a148c;
}

.list_category.blocklyToolboxSelected {
  background-color: #4a148c !important;
}

.variable_category {
  border-left: 8px solid #a55b80;
}

.variable_category.blocklyToolboxSelected {
  background-color: #a55b80 !important;
}

.procedure_category {
  border-left: 8px solid #b88cc0;
}

.procedure_category.blocklyToolboxSelected {
  background-color: #b88cc0 !important;
}
```

Refresh your web page. You should see the new colours beside each category:

![A Blockly editor with Halloween colours next to each category.](categories-halloween.png)


## Blocks

In this section, you will create CSS rules to assign the colours used by the
[blocks section](https://blocklycodelabs.dev/codelabs/theme-extension-identifier/index.html#5)
of the themes codelab to the logic, loops, text, and lists blocks. This is a bit
more complex than setting component or category colours and you'll do it in
several steps.

### Block fill and stroke

Your first step is to set the `fill` and `stroke` of the logic blocks.

Note that setting the `fill` and `stroke` is specific to the
[renderer](https://developers.google.com/blockly/guides/create-custom-blocks/renderers/overview),
you are using. (In this codelab, you are using the Thrasos renderer.) An
important consequence of this is that you need different CSS for different
renderers.

#### Identify the block element

Drag an `if do` block onto the workspace and find it with the element inspector:

```
<body>
  <div class="blocklyDiv">
    <div class="injectionDiv">
      <svg class="blocklySvg">
        <g class="blocklyWorkspace">
          <g class="blocklyBlockCanvas">
            <g class="controls_if blocklyBlock logic_blocks">
```

Notice that the block's `<g>` element has classes for the block's type
(`controls_if`) and style (`logic_blocks`). These are the values of the
[`type` and `style` properties in the block's definition](https://github.com/RaspberryPiFoundation/blockly/blob/1c280d10cc1dcad7d50a1678211871058d4e9cfb/blocks/logic.ts#L50).
You will use the style class to assign the same colour to all of the logic
blocks.

(If you were building blocks from scratch and wanted to avoid themes, you would
assign this class with the `classes` property in the block definition. However,
because these are standard blocks and they were built with themes in mind, using
the style class works just as well.)

#### Choose an element to use

Next, you need to decide what element to use in your colour rule. The `<g>`
element identifies the block but doesn't draw it. Instead, you can use the `<g>`
element's first child. This is a `<path>` element with `fill` and `stroke`
presentation attributes, which are easily overridden.

Note that different renderers use different numbers of `<path>` elements to
draw a block: Thrasos uses a single `<path>` element, Geras uses three `<path>`
elements, and Zelos uses one `<path>` for the outside of the block and one
`<path>` for each inline input.

#### Choose colours

The last step before writing your colour rules is to decide what colours to use.
The Halloween theme in the themes codelab sets three colours:

```
    'logic_blocks': {
      'colourPrimary': "#8b4513",
      'colourSecondary':"#ff0000",
      'colourTertiary':"#c5eaff"
    },
```

How these colours are used depends on the renderer. The Thrasos renderer uses
the primary colour as the `fill` of the block, the tertiary colour as the
`stroke`, and the secondary colour as the `fill` when the block is a
[shadow block](https://developers.google.com/blockly/guides/configure/web/toolboxes/preset#shadow_blocks).

#### Add your rules

You're now ready to add your rules to set the `fill` and `stroke` of the logic
blocks:

```css
/**********/
/* BLOCKS */
/**********/

/* LOGIC BLOCKS */

.logic_blocks > .blocklyPath {
  fill: #8b4513;
  stroke: #c5eaff;
}

.logic_blocks.blocklyShadow > .blocklyPath {
  fill: #ff0000;
  stroke: none;
}
```

Refresh your web page and open the **Logic** category. You should see that the
logic blocks are now rendered in autumnal brown instead of blue:

![A Blockly editor with the Logic category open. The blocks in the flyout are
brown.](blocks-logic.png)

### Disabled blocks

Your next step is to handle disabled blocks. Drag an `if do` block and any block
from the **Loops** category onto the workspace. Right-click on each block and
disable it using the context menu. Notice that the loop block has a cross-hatch
pattern while the `if do` block does not:

![An "if do" block and a "repeat 10 times" block, both of which are disabled.
The "if do" block is solid brown and the "repeat 10 times" block has a
cross-hatch pattern.](blocks-disabled-wrong.png)

This is because the rules you just added have the same specificity as the
Blockly rules that set the cross-hatch pattern. (You can see this if you click
on the `if do` block's `<path>` element and inspect its styles.) Because your
rules occur later in the document, they take precedence. To use the standard
CSS for disabled blocks, add a `:not(.blocklyDisabledPattern)` to your rules:

```css
/* LOGIC BLOCKS */

.logic_blocks:not(.blocklyDisabledPattern) > .blocklyPath {
  fill: #8b4513;
  stroke: #c5eaff;
}

.logic_blocks:not(.blocklyDisabledPattern).blocklyShadow > .blocklyPath {
  fill: #ff0000;
  stroke: none;
}
```

Refresh your page, drag the `if do` block onto the workspace, and disable it. It
should now use the disabled pattern:

![A disabled "if do" block with a cross-hatch pattern.](blocks-disabled-right.png)

### Dropdown arrows

You now need to handle dropdown arrows. Drag a logic comparison block onto the
workspace and look closely at the inverted triangle in the dropdown field --
it's blue even though the rest of the block is brown:

![A brown logic comparison block with a blue dropdown arrow.](blocks-arrow-wrong.png)

If you look at the triangle with the element inspector, you'll see that it's a
character in an SVG `<tspan>` element:

```
<body>
  <div class="blocklyDiv">
    <div class="injectionDiv">
      <svg class="blocklySvg">
        <g class="blocklyWorkspace">
          <g class="blocklyBlockCanvas">
            <g class="logic_compare">
              <g class="blocklyDropdownField">
                <text class="blocklyDropdownText">
                  <tspan style="fill: rgb(91, 128, 165);"> ▾</tspan>
```

You can also see that its colour is set with a `style` attribute, which can only
be overridden with an `!important` declaration. To do this, add the following
rules:

```css
.logic_blocks > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #8b4513 !important;
}

.logic_blocks.blocklyShadow > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #ff0000 !important;
}
```

Reload your page and drag the comparison block out again. The arrow should be
the same colour as the rest of the block:

![A brown logic comparison block with a brown dropdown arrow.](blocks-arrow-right.png)

### Loop, text, and list blocks

Your last step is to add similar rules for the loop, text, and list blocks:

```css
/* LOOP BLOCKS */

.loop_blocks:not(.blocklyDisabledPattern) > .blocklyPath {
  fill: #85e21f;
  stroke: #c5eaff;
}

.loop_blocks:not(.blocklyDisabledPattern).blocklyShadow > .blocklyPath {
  fill: #ff0000;
  stroke: none;
}

.loop_blocks > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #85e21f !important;
}

.loop_blocks.blocklyShadow > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #ff0000 !important;
}

/* TEXT BLOCKS */

.text_blocks:not(.blocklyDisabledPattern) > .blocklyPath {
  fill: #fe9b13;
  stroke: #c5eaff;
}

.text_blocks:not(.blocklyDisabledPattern).blocklyShadow > .blocklyPath {
  fill: #ff0000;
  stroke: none;
}

.text_blocks > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #fe9b13 !important;
}

.text_blocks.blocklyShadow > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #ff0000 !important;
}

/* LIST BLOCKS */

.list_blocks:not(.blocklyDisabledPattern) > .blocklyPath {
  fill: #4a148c;
  stroke: #cdb6e9;
}

.list_blocks:not(.blocklyDisabledPattern).blocklyShadow > .blocklyPath {
  fill: #ad7Be9;
  stroke: none;
}

.list_blocks > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #4a148c !important;
}

.list_blocks.blocklyShadow > .blocklyDropdownField .blocklyDropdownText tspan {
  fill: #ad7be9 !important;
}
```

And that's it! Reload your page and explore the blocks in your Halloween-themed
editor:

![A Blockly editor with Halloween colors: a yellow toolbox, orange workspace,
red scrollbars, and neon green loop blocks.](blocks-loops.png)

## Summary

In this codelab, you learned how to use CSS to set the colours of your Blockly
editor.

For more information, see
[Style with CSS](https://developers.google.com/blockly/guides/configure/web/appearance/css)
in the Blockly user guides.


# @vjscc/modal

Vanilla JavaScript modal component.

![npm](https://img.shields.io/npm/v/@vjscc/modal?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/@vjscc/modal?style=flat-square)
![GitHub](https://img.shields.io/github/license/vjscc/modal?style=flat-square)

[简体中文](./README_zh.md) | **English**

# Install and Import

If you want use with bundler like `webpack`, and import library with `commonjs` or `ESM`, you could install it with `npm` or `yarn`.

Use npm:

```bash
npm install @vjscc/modal
```

Or use yarn:

```bash
yarn add @vjscc/modal
```

Then just import libarary:

```javascript
// Use commonjs
const VjsccModal = require('@vjscc/modal')

// Use ESM
import VjsccModal from '@vjscc/modal'
import '@vjscc/modal/dist/modal.min.css'
```

> We provide 3 versions for different ways to import: `UMD`, `ESM` and `browser`, see [package.json](./package.json) to get the dist path.

If you want import with `<link>` and `<script>` tag, you could download source or use CDN like [jsdelivr](https://www.jsdelivr.com/).

> `UMD` version is not minified, `browser` is minified, we recommend use `browser` version in usual. And `CSS` just have minified version.

# Get Start

First you should have a HTML structure like this:

```html
<!-- mask of modal -->
<div class="vjscc-modal-mask" style="display: none">
  <!-- modal -->
  <div class="vjscc-modal">
    <!-- header of modal(optional) -->
    <div class="vjscc-modal-header"></div>

    <!-- body of modal(optional) -->
    <div class="vjscc-modal-body"></div>

    <!-- footer of modal(optional) -->
    <div class="vjscc-modal-footer">
      <!-- ok button(optional) -->
      <button class="vjscc-modal-footer-btn vjscc-modal-footer-btn-ok">OK</button>

      <!-- cancel button(optional) -->
      <button class="vjscc-modal-footer-btn vjscc-modal-footer-btn-cancel">Cancel</button>
    </div>
  </div>
</div>
```

> The `mask` and `modal` part is `required`, Others in `modal` is optional.

Then create a modal instance and show it in JavaScript:

```javascript
// Create modal instance.
const modal = new VjsccModal({ $mask: '.vjscc-modal-mask' })

// Show modal.
modal.show()
```

Then you will see the modal show in your browser.

# API

## new VjsccModal(options)

options properties:

| name      | type                                         | require | default | description                       |
| --------- | -------------------------------------------- | ------- | ------- | --------------------------------- |
| $mask     | `string \| HTMLElement`                      | ✔       |         | mask element or its CSS selector  |
| isShow    | `boolean`                                    |         | false   | show directly after instantiation |
| maskClose | `boolean`                                    |         | true    | close modal when click mask       |
| maskColor | `string`                                     |         |         | color of mask, CSS format         |
| onOK      | `(this: VjsccModal, ev: MouseEvent) => void` |         |         | handler when click ok button      |
| onCancel  | `(this: VjsccModal, ev: MouseEvent) => void` |         |         | handler when click cancel button  |

> **Notice**: If you pass `onOK` or `onCancel` but there's no ok or cancel button element in your HTML, nothing will happen but a warning. Also, if you have cancel button element in your HTML and didn't pass `onCancel`, cancel button will have `hide()` as click event handler.

## Members

### id

type: `number`

Id of modal instance.

### isShow

type: `boolean`

Whether modal is show or not. Can not change status of modal by changing this value, use `show()` and `hide()`.

### maskClose

type: `boolean`

Close modal when click mask.

### maskColor

type: `string`

Color of mask, passed via constructor options.

### $mask

type: `HTMLElement`

Mask element.

### $modal

type: `HTMLElement`

modal element.

### $header

type: `HTMLElement | undefined`

Header of modal.

### $body

type: `HTMLElement | undefined`

Body of modal.

### $footer

type: `HTMLElement | undefined`

Footer of modal.

### $ok

type: `HTMLElement | undefined`

OK button element.

### $cancel

type: `HTMLElement | undefined`

Cancel button element.

## Methods

### show()

type: `() => VjsccModal`

Show modal.

### hide()

type: `() => VjsccModal`

Hide modal.

### setOnOK()

type: `(fn: handler) => VjsccModal`

Interface of `handler`:

```typescript
type handler = (this: VjsccModal, ev: MouseEvent) => void
```

Set handler of ok button click event.

### setOnCancel()

type: `(fn: handler) => VjsccModal`

Set handler of cancel button click event.

# License

MIT

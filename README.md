# @vjscc/modal

Vanilla JavaScript modal component.

![npm](https://img.shields.io/npm/v/@vjscc/modal?logo=npm&style=flat-square)
![npm type definitions](https://img.shields.io/npm/types/@vjscc/modal?logo=typescript&style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/@vjscc/modal?logo=npm&style=flat-square)

<!-- ![Codecov](https://img.shields.io/codecov/c/github/vjscc/modal?logo=codecov&style=flat-square) -->

![GitHub](https://img.shields.io/github/license/vjscc/modal?logo=github&style=flat-square)

[简体中文](./README_zh.md) | **English**

# Install and Import

If you want use with bundler like `webpack`, and import library with `commonjs` or `ESM`, you could install it with `npm` or `yarn`.

Use npm:

```bash
npm install @vjscc/modal -S
```

Or use yarn:

```bash
yarn add @vjscc/modal
```

Then import libarary and style:

```javascript
// Use commonjs
const VjsccModal = require('@vjscc/modal')
require('@vjscc/modal/dist/modal.min.css')

// Use ESM
import VjsccModal from '@vjscc/modal'
import '@vjscc/modal/dist/modal.min.css'
```

> We provide 3 versions for different ways to import: `UMD`, `ESM` and `browser`, see [package.json](./package.json) to get the dist path.

If you want import with `<link>` and `<script>` tag, you could download source on [Release Page](https://github.com/vjscc/modal/releases) or use CDN like [jsdelivr](https://www.jsdelivr.com/).

> `UMD` version is not minified, `browser` is minified, we recommend use `browser` version in usual. `ESM` version is mostly close to source code and for those use bundler support ESM. And `CSS` just have minified version.

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

type: `string | undefined`

Color of mask, passed via constructor options, if you didn't pass its value would be `undefined`.

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

### setOnOK(fn)

type: `(fn: handler) => VjsccModal`

Type definition of `handler` in TypeScript:

```typescript
type handler = (this: VjsccModal, ev: MouseEvent) => void
```

Set handler of ok button click event.

### setOnCancel(fn)

type: `(fn: handler) => VjsccModal`

Set handler of cancel button click event.

## Static function

### VjsccModal.config(config)

Interface of argument `config`:

```typescript
interface IConfigArgument {
  isShow?: boolean
  maskClose?: boolean
  maskColor?: string
}
```

type: `(config: IConfigArgument) => void`

Set default config. See about you will know what they are for.

# License

MIT

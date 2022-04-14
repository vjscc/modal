# @vjscc/modal

Vanilla JavaScript modal component.

![npm](https://img.shields.io/npm/v/@vjscc/modal?logo=npm&style=flat-square)
![npm type definitions](https://img.shields.io/npm/types/@vjscc/modal?logo=typescript&style=flat-square)
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
const VjsccModal = require('@vjscc/modal') // UMD
require('@vjscc/modal/dist/index.css')

// Use ESM
import VjsccModal from '@vjscc/modal' // ESM
import '@vjscc/modal/dist/index.css'
```

Or use `link` and `script` tag:

```html
<link rel="stylesheet" href="path/to/vjscc-modal.min.css" />

<!-- Unbundled UMD -->
<script src="path/to/vjscc-utils.min.js"></script>
<script src="path/to/vjscc-modal.min.js"></script>

<!-- Bundled UMD -->
<script src="path/to/vjscc-modal.bundle.min.js"></script>
```

If you want import with `<link>` and `<script>` tag, you could download source on [Release Page](https://github.com/vjscc/modal/releases) or use CDN like [jsdelivr](https://www.jsdelivr.com/).

## Version Details

| version       | path                                   | cjs | esm | amd | iife | minified | include `@vjscc/utils` |
| ------------- | -------------------------------------- | --- | --- | --- | ---- | -------- | ---------------------- |
| UMD           | dist/index.js                          | ✔   |     | ✔   | ✔    |          |                        |
| ESM           | dist/es/index.js                       |     | ✔   |     |      |          |                        |
| Unbundled UMD | dist/browser/vjscc-modal.min.js        | ✔   |     | ✔   | ✔    | ✔        |                        |
| Bundled UMD   | dist/browser/vjscc-modal.bundle.min.js | ✔   |     | ✔   | ✔    | ✔        | ✔                      |

> Please notice that we use `@vjscc/utils` as dependency, so if you've already used `@vjscc/utils`
> or other component libraries from `vjscc` through `script` tags, we suggest that you could use `Unbundled UMD` version. Otherwise, use other versions maybe better.

See [package.json](./package.json) and [rollup.config.js](./rollup.config.js) to get further.

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

| name           | type                                         | require | default             | description                       |
| -------------- | -------------------------------------------- | ------- | ------------------- | --------------------------------- |
| $mask          | `string \| HTMLElement`                      | ✔       |                     | mask element or its CSS selector  |
| isShow         | `boolean`                                    |         | `false`             | show directly after instantiation |
| maskClose      | `boolean`                                    |         | `true`              | close modal when click mask       |
| maskColor      | `string`                                     |         |                     | color of mask, CSS format         |
| onOK           | `(this: VjsccModal, ev: MouseEvent) => void` |         |                     | handler when click ok button      |
| onCancel       | `(this: VjsccModal, ev: MouseEvent) => void` |         |                     | handler when click cancel button  |
| duration       | `number`                                     |         | `0.25 * 1000`       | fade in/out animation duration    |
| timingFunction | `(x: number) => number`                      |         | `VjsccUtils.linear` | animation timing function         |

> **Notice**: If you pass `onOK` or `onCancel` but there's no ok or cancel button element in your HTML, nothing will happen but a warning. Also, if you have cancel button element in your HTML and didn't pass `onCancel`, cancel button will have `hide()` as click event handler.

## Members

### id

type: `number`

Id of modal instance.

### isShow

type: `boolean`

Whether modal is show or not. Can not change status of modal by changing this value, use `show()` and `hide()`.

### duration

type: `(x: number) => number`

Fade in/out animation duration.

### timingFunction

type: `boolean`

Animation timing function.

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
interface IDefaultConfig {
  isShow: boolean
  maskClose: boolean
  maskColor?: string
  duration: number
  timingFunction: (x: number) => number
}

type IConfigArgument = Partial<IDefaultConfig>
```

type: `(config: IConfigArgument) => void`

Set default config. See about you will know what they are for.

# License

MIT

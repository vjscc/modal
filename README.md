# gm-alert

This lib is a JavaScript tool kit of alert. It's dedicated to lightweight, concise and highly customizable. We just give a simple realization of a alert so that you could do what ever you want easily based on it.

[简体中文](./README_zh.md) | **English**

## Install

```bash
npm install gm-alert -S
# Or use yarn
yarn add gm-alert
```

Or just use `<script>` tag:

```html
<link rel="stylesheet" href="path/to/gm-alert.min.css" />
<script src="path/to/gm-alert.min.js"></script>
```

To get dist js and css files, please visit [Releases Page](https://github.com/Gu-Miao/gm-alert/releases) or use CDN like `jsDelivr`.

## Usage

If you use `import/require`:

```js
import GmAlert from 'gm-alert'
import 'gm-alert/gm-alert.min.css'

// Create an alert instance
const instance = GmAlert({
  // ...some options
})

// Show alert
instance.show()

// Hide alert
instance.hide()
```

If you use `<script/>` tag to import, `GmAlert` will be mounted on `window`.

> Don't forget to import css file.

## API

### GmAlert(option)

Create a new alert instance with options:

| option          | type                  | description                              | default value       |
| --------------- | --------------------- | ---------------------------------------- | ------------------- |
| header          | `string\|HTMLElement` | header of modal                          | `''`                |
| headerClassName | `string`              | extra class for title element            | `''`                |
| body            | `string\|HTMLElement` | body of modal                            | `''`                |
| bodyClassName   | `string`              | extra class for body element             | `''`                |
| showFooter      | `boolean`             | show footer or not                       | `true`              |
| footerClassName | `string`              | extra class for footer element           | `''`                |
| okText          | `string`              | text of ok button                        | `'ok'`              |
| onOK            | `function`            | callback when you click ok button        | `() => this.hide()` |
| cancelText      | `string`              | text of cancel button                    | `'cancel'`          |
| onCancel        | `function`            | callback when you click cancel button    | `() => this.hide()` |
| maskClosAble    | `boolean`             | call `onCancel` when click mask of modal | true                |
| isShow          | `boolean`             | show alert or not                        | false               |

It will return an alert instance, the relationship between them is:

```js
instance.__proto = GmAlert.prototype
```

So that instance could use all of prototype methods on `GmAlert`.

Instance will have those properties:

```js
GmAlert {
  $body
  $cancel
  $footer
  $header
  $mask
  $modal
  $ok
  isShow,
  id
}
```

Properties start with `$` means it is a HTML element and you could operate it directly. In version 2.0.0, We had exposed all of options on instance but they were useless and unreactive after initialization, thus, they were removed.

- We use `header` instead of `title` because we are considering changing the DOM structure of top part in modal:

```
div[data-role='header']
  |
  +--div[data-role='title']
  |
  +--button[data-role='close']
```

Obviously, this is more semantic.

- Type of `header` and `body` had been changed to `string|HTMLElement`, if you give a string, we will change its `innerHTML`, otherwise we'll call `append()` to insert coming content.

- `onOK` and `onCancel` will recevie alert instance as first argument.

- You could use `document.querySelector('gm-alert-' + id)` to get container of alert HTML node.

> The `this` below means the instance created by `GmAlert()`.

### this.isShow

You can toggle alert by change `this.isShow` to another truthy value. And you could also judge status of alert with it.

### GmAlert.prototype.show()

Show alert and change `this.isShow` to `true`.

### GmAlert.prototype.hide()

Hide alert and change `this.isShow` to `false`.

### GmAlert.prototype.setHeader(header[, headerClassName])

Set header content and extra classnames.

- `header` **{ string\|HTMLElement }**

Content of header, it could be a string or a HTML element.

- `headerClassName` **{ string }** _optional_

Extra classnames for header, and if you have extra classname before and `headerClassName` is not truthy, we'll not change it.

### GmAlert.prototype.setBody(body[, bodyClassName])

Set body content and extra classnames.

- `body` **{ string\|HTMLElement }**

Content of body, it could be a string or a HTML element.

- `bodyClassName` **{ string }** _optional_

Extra classnames for body, and if you have extra classname before and `bodyClassName` is not truthy, we'll not change it.

### GmAlert.prototype.setFooter(showFooter[, footerClassName])

Set footer show or not and extra classnames.

- `showFooter` **{ boolean }**

Show footer or not, it is controlled by `dispaly: none` so that it won't influence butons in footer even if footer is not show.

- `footerClassName` **{ string }** _optional_

Extra classnames for footer, and if you have extra classname before and `footerClassName` is not truthy, we'll not change it.

### GmAlert.prototype.setOK(okText[, onOK])

Set inner content and click listener of ok button.

- `okText` **{ string }**

Inner content of ok button, default is `ok`.

- `onOK` **{ function }** _optional_

Callback when you click ok button, it will recive alert instance as first argument.

### GmAlert.prototype.setCancel(cancelText[, onCancel])

Set body content and extra classnames.

Set inner content and click listener of cancel button.

- `cancelText` **{ string }**

Inner content of ok button, default is `cancel`.

- `onCancel` **{ function }** _optional_

Callback when you click cancel button, it will recive alert instance as first argument. And pay attention that `() => this.hide()` will be called before `onCancel()`.

## DOM Structure

To aviod style conflict causing by same classnames, we use `data-role` instead of `class`:

```
div.gm-alert-mask
  |
  +--div[data-role='modal']
       |
       +--div[data-role='header']
       |
       +--div[data-role='body']
       |
       +--div[data-role='footer']
            |
            +--button[data-role='ok']
            |
            +--button[data-role='button']
```

## History versions documents

Please visit [this](./docs/history.md).

## Coming soon

- Prototype methods changes and optimization.
- `extend()` to extend alert.
- Hooks for status change listener.
- Plugin interface.

## License

MIT

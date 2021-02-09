# gm-alert

This lib is a JavaScript tool kit of alert. It's dedicated to lightweight, profiles and highly customizable. It just give a basic style and DOM structure of a modal so that you could do what ever you want easily.

## Install

```bash
npm install gm-alert
# Or use yarn
yarn add gm-alert
```

or just use `<script>` tag:

```html
<link rel="stylesheet" href="path/to/gm-alert.min.css" />
<script src="path/to/gm-alert.min.js"></script>
```

To get dist js and css files, visit [releases page](https://github.com/Gu-Miao/gm-alert/releases) or use CDN of `jsDelivr`.

## Usage

if you use `import/require`:

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

> Don't forget to import css file.

If you use `<script/>` tag to import, `GmAlert` will be mounted on `window`.

## API

### GmAlert(config)

Create a new alert instance with options:

| option          | type     | description                                                                | default value |
| --------------- | -------- | -------------------------------------------------------------------------- | ------------- |
| title           | \*       | title of modal, but if `Boolean(title)` is `false`, title will not display | `''`          |
| titleClassName  | string   | extra class for title element                                              | `''`          |
| body            | \*       | body of modal                                                              | `''`          |
| bodyClassName   | string   | extra class for body element                                               | `''`          |
| footerClassName | string   | extra class for footer element                                             | `''`          |
| okText          | string   | text of ok button                                                          | `'ok'`        |
| onOK            | function | callback when you click ok button                                          | `undefined`   |
| cancelText      | string   | text of cancel button                                                      | `'cancel'`    |
| onCancel        | function | callback when you click cancel button                                      | `undefined`   |
| maskClosAble    | boolean  | call `onCancel` when click mask of modal                                   | true          |
| isShow          | boolean  | show alert or not                                                          | false         |

It will return an alert instance.

### instance.show()

Show alert and change `instance.isShow` to `true`.

### instance.hide()

Hide alert and change `instance.isShow` to `false`.

## About v2.0.0

The new API draws on the design idea of jQuery, so that you could set every detail of every alert more easily. But please pay attention that you can't change the actual effect by modifying fileds on instance without calling prototype method yet. And more method is coming soon.

## Coming soon

- Prototype methods for custom alert.
- extend() to extend alert.
- Hooks for status change listener.
- Plugin interface.

## License

MIT

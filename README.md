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

To get dist js and css files, visit [Github](https://github.com/Gu-Miao/gm-alert) or use CDN of `jsDelivr`.

## DOM structure

div.gm-alert-mask > div.modal > div.title + div.body + div.footer > button[data-type="ok"] + button[data-type="cancel"]

## API

### showAlert(config)

show alert with options:

| option          | type     | description                                                                | default value |
| --------------- | -------- | -------------------------------------------------------------------------- | ------------- |
| title           | \*       | title of modal, but if `Boolean(title)` is `false`, title will not display | `''`          |
| titleClassName  | string   | extra class for title element                                              | `''`          |
| body            | \*       | body of modal                                                              | `''`          |
| bodyClassName   | string   | extra class for body element                                               | `''`          |
| footerClassName | string   | extra class for footer element                                             | `''`          |
| okText          | string   | text of ok button                                                          | `'ok'`        |
| onOK            | function | callback when you click ok button                                          | `hidAlert`    |
| cancelText      | string   | text of cancel button                                                      | `'cancel'`    |
| onCancel        | function | callback when you click cancel button                                      | `hidAlert`    |
| maskClosAble    | boolean  | call `onCancel` when click mask of modal                                   | true          |

### hideAlert()

hide alert

## License

MIT

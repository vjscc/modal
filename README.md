# gm-alert

javascript alert ui kit

## Usage

import dependencies, we could only use script to import lib, so **don't run `npm install gm-alert` for now**. Go github to get css and js file.

```html
<link rel="stylesheet" href="path/to/gm-alert.min.css" />
<script src="path/to/gm-alert.min.js"></script>
```

> Notice that you should import js after window is onload otherwise you will get an error.

## API

### window.showAlert(config)

show alert with options:

| option          | type     | description                                                              | default value      |
| --------------- | -------- | ------------------------------------------------------------------------ | ------------------ |
| title           | \*       | title of modal, but is `Boolean(title)` is false, title will not display | `''`               |
| titleClassName  | string   | extra class name for title element                                       | `''`               |
| body            | \*       | body of modal                                                            | `''`               |
| bodyClassName   | string   | extra class name for body element                                        | `''`               |
| footerClassName | string   | extra class name for footer element                                      | `''`               |
| okText          | string   | text of ok button                                                        | `'ok'`             |
| onOK            | function | callback when you click ok button                                        | `() => void 0`     |
| cancelText      | string   | text of cancel button                                                    | `'cancel'`         |
| onCancel        | function | callback when you click cancel button                                    | `window.hideAlert` |
| maskClosAble    | boolean  | call `onCancel` when click mask of modal                                 | true               |

### window.hideAlert()

hide alert

## license

MIT

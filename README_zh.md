# @vjscc/modal

原生 JavaScript 弹出层组件。

![npm](https://img.shields.io/npm/v/@vjscc/modal?logo=npm&style=flat-square)
![npm type definitions](https://img.shields.io/npm/types/@vjscc/modal?logo=typescript&style=flat-square)
![GitHub](https://img.shields.io/github/license/vjscc/modal?logo=github&style=flat-square)

**简体中文** | [English](./README.md)

# 安装和引入

如果你想和打包工具比如 `webpack` 一起使用并使用 `commonjs` 或 `ESM` 的方式来引入库，你可以用 `npm` 或 `yarn` 来安装。

使用 npm:

```bash
npm install @vjscc/modal -S
```

或者使用 yarn:

```bash
yarn add @vjscc/modal
```

接下来引入库和样式:

```javascript
// 使用 commonjs。
const VjsccModal = require('@vjscc/modal')
require('@vjscc/modal/dist/index.css')

// 使用 ESM。
import VjsccModal from '@vjscc/modal'
import '@vjscc/modal/dist/index.css'
```

或者使用 `link` 和 `script` 标签：

```html
<link rel="stylesheet" href="path/to/vjscc-modal.min.css" />

<!-- Unbundled UMD -->
<script src="path/to/vjscc-utils.min.js"></script>
<script src="path/to/vjscc-modal.min.js"></script>

<!-- Bundled UMD -->
<script src="path/to/vjscc-modal.bundle.min.js"></script>
```

如果你想用 `<link>` 和 `<script>` 标签，你可以从 [发布页](https://github.com/vjscc/modal/releases) 或者用像 [jsdelivr](https://www.jsdelivr.com/) 这样的 CDN。

## 版本细节

| 版本          | 路径                                   | cjs | esm | amd | iife | 是否压缩 | 包含 `@vjscc/utils` |
| ------------- | -------------------------------------- | --- | --- | --- | ---- | -------- | ------------------- |
| UMD           | dist/index.js                          | ✔   |     | ✔   | ✔    |          |                     |
| ESM           | dist/es/index.js                       |     | ✔   |     |      |          |                     |
| Unbundled UMD | dist/browser/vjscc-modal.min.js        | ✔   |     | ✔   | ✔    | ✔        |                     |
| Bundled UMD   | dist/browser/vjscc-modal.bundle.min.js | ✔   |     | ✔   | ✔    | ✔        | ✔                   |

> 请注意我们的库依赖于 `@vjscc/utils`，因此如果你已经在使用 `script` 标签去加载 `@vjscc/utils` 或者其他来自 `vjscc` 的组件库，那么我们建议你使用 `Unbundled UMD` 版本. 否则，用其他的版本可能会更好。

查看 [package.json](./package.json) 和 [rollup.config.js](./rollup.config.js) 了解更多。

# 起步

首先，你需要有一个这样的 HTML 结构：

```html
<!-- 遮罩 -->
<div class="vjscc-modal-mask" style="display: none">
  <!-- 弹出层 -->
  <div class="vjscc-modal">
    <!-- 弹出层头部（可选的） -->
    <div class="vjscc-modal-header"></div>

    <!-- 弹出层主体（可选的） -->
    <div class="vjscc-modal-body"></div>

    <!-- 弹出层尾部（可选的） -->
    <div class="vjscc-modal-footer">
      <!-- 确定按钮（可选的） -->
      <button class="vjscc-modal-footer-btn vjscc-modal-footer-btn-ok">确定</button>

      <!-- 取消按钮（可选的） -->
      <button class="vjscc-modal-footer-btn vjscc-modal-footer-btn-cancel">取消</button>
    </div>
  </div>
</div>
```

> `遮罩` 和 `弹出层` 部分是 `必须的`， 其他的部分均为 `可选的`。

接着，在 JavaScript 中创建一个弹出层实例并显示它：

```javascript
// 创建弹出层实例。
const modal = new VjsccModal({ $mask: '.vjscc-modal-mask' })

// 显示弹出层。
modal.show()
```

然后你就可以看到弹出层已经展示在浏览器中了。

# 接口

## new VjsccModal(options)

配置的属性：

| 名称           | 类型                                         | 是否必须 | 默认值              | 描述                                |
| -------------- | -------------------------------------------- | -------- | ------------------- | ----------------------------------- |
| $mask          | `string \| HTMLElement`                      | ✔        |                     | 遮罩层元素或其 CSS 选择器           |
| isShow         | `boolean`                                    |          | `false`             | 是否在实例化后显示弹出层            |
| maskClose      | `boolean`                                    |          | `true`              | 点击遮罩时关闭弹出层                |
| maskColor      | `string`                                     |          |                     | 遮罩层的颜色，使用 CSS 中的颜色格式 |
| onOK           | `(this: VjsccModal, ev: MouseEvent) => void` |          |                     | 点击确定按钮的回调函数              |
| onCancel       | `(this: VjsccModal, ev: MouseEvent) => void` |          |                     | 点击取消按钮的回调函数              |
| duration       | `number`                                     |          | `0.25 * 1000`       | 渐入（出）动画时长                  |
| timingFunction | `(x: number) => number`                      |          | `VjsccUtils.linear` | 动画时间函数                        |

> **注意**: 如果你传入 `onOK` 或 `onCancel` 但是你的 HTML 中没有确定按钮或取消按钮元素，那么除了警告之外什么都不会发生。当然，如果有取消按钮但是没有传 `onCancel`，取消按钮会以 `hide()` 方法作为点击事件的回调。

## 成员

### id

类型：`number`

实例 id。

### isShow

类型：`boolean`

弹出层是否显示。改变这个值并不能改变弹出层的状态，请使用 `show()` 和 `hide()` 方法。

### duration

type: `(x: number) => number`

渐入（出）动画时长。

### timingFunction

type: `boolean`

动画时间函数。

### maskClose

类型：`boolean`

点击遮罩的时候关闭弹出层。

### maskColor

类型：`string | undefined`

遮罩层的颜色，其值为实例化时传入的值。

### $mask

类型：`HTMLElement`

遮罩层元素。

### $modal

类型：`HTMLElement`

弹出层元素。

### $header

类型：`HTMLElement | undefined`

弹出层头部元素。

### $body

类型：`HTMLElement | undefined`

弹出层主体元素。

### $footer

类型：`HTMLElement | undefined`

弹出层尾部元素。

### $ok

类型：`HTMLElement | undefined`

确定按钮。

### $cancel

类型：`HTMLElement | undefined`

取消按钮。

## 原型方法

### show()

类型：`() => VjsccModal`

显示弹出层。

### hide()

类型：`() => VjsccModal`

隐藏弹出层。

### setOnOK()

类型：`(fn: handler) => VjsccModal`

`handler` 的类型定义：

```typescript
type handler = (this: VjsccModal, ev: MouseEvent) => void
```

设置确定按钮的回调函数。

### setOnCancel()

类型：`(fn: handler) => VjsccModal`

设置取消按钮的回调函数。

## 静态方法

### VjsccModal.config(config)

`config` 参数的接口:

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

类型：`(config: IConfigArgument) => void`

设置默认配置。参考上面的文档可知这些字段的作用。

# 许可证

MIT

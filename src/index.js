import { isPlainObject, isFunction, isUndefined, changeNodeContent, fadeIn, fadeOut } from './utils'

let i = 0
const listeners = {
  onOK: undefined,
  onCancel: undefined
}

function createMask() {
  const $mask = document.createElement('div')
  $mask.setAttribute('class', 'gm-alert-mask')
  $mask.setAttribute('id', `ga-${i++}`)
  $mask.style.display = 'none'
  $mask.innerHTML = `<div data-role="modal"><div data-role="header"></div><div data-role="body"></div><div data-role="footer"><button data-role="ok">确定</button><button data-role="cancel">取消</button></div></div>`
  document.body.append($mask)
  return $mask
}

const GmAlert = config => {
  // The config must be a plain object
  if (!isPlainObject(config)) {
    throw new ReferenceError('Config is not plain object.')
  }

  // Destruct config
  const {
    header = '',
    headerClassName = '',
    body = '',
    bodyClassName = '',
    showFooter = true,
    footerClassName = '',
    okText = 'ok',
    onOK = undefined,
    cancelText = 'cancel',
    onCancel = undefined,
    maskClosAble = true,
    isShow = false
  } = config

  // Validate config item
  if (!isFunction(onOK) && isUndefined(onOK)) {
    throw new ReferenceError(`Config item 'onOK' is not a function or undefined.`)
  }
  if (!isFunction(onCancel) && isUndefined(onCancel)) {
    throw new ReferenceError(`Config item 'onCancel' is not a function or undefined.`)
  }

  let _show = isShow

  const instance = {}

  instance.__proto__ = GmAlert.prototype

  instance.$mask = createMask()
  maskClosAble && instance.$mask.addEventListener('click', () => instance.hide())

  instance.$modal = instance.$mask.querySelector('[data-role="modal"]')
  instance.$modal.addEventListener('click', e => e.stopPropagation())

  // Set instance
  instance
    .setHeader(header, headerClassName)
    .setBody(body, bodyClassName)
    .setFooter(showFooter, footerClassName)
    .setOK(okText, onOK)
    .setCancel(cancelText, onCancel)

  // Show modal or not
  Object.defineProperty(instance, 'isShow', {
    get() {
      return _show
    },
    set(value) {
      _show = value
      value ? this.show() : this.hide()
    }
  })
  isShow && instance.show()

  return instance
}

GmAlert.prototype.show = function () {
  fadeIn(this.$mask, 'flex')
  !this.isShow && (this.isShow = true)

  return this
}

GmAlert.prototype.hide = function () {
  fadeOut(this.$mask)
  this.isShow && (this.isShow = false)

  return this
}

GmAlert.prototype.setHeader = function (header, headerClassName) {
  if (!this.$header) this.$header = this.$modal.querySelector('[data-role="header"]')
  changeNodeContent(this.$header, header)
  this.$header.style.display = header ? 'block' : 'none'
  headerClassName && this.$header.setAttribute('class', headerClassName)

  return this
}

GmAlert.prototype.setBody = function (body, bodyClassName) {
  if (!this.$body) this.$body = this.$modal.querySelector('[data-role="body"]')
  changeNodeContent(this.$body, body)
  bodyClassName && this.$body.setAttribute('class', bodyClassName)

  return this
}

GmAlert.prototype.setFooter = function (showFooter, footerClassName) {
  if (!this.$footer) this.$footer = this.$modal.querySelector('[data-role="footer"]')
  footerClassName && this.$footer.setAttribute('class', footerClassName)
  if (!showFooter) this.$footer.style.display = 'none'

  return this
}

function setOKorCancel(type, text, callback) {
  const $type = '$' + type
  const onType = type === 'ok' ? 'onOK' : 'onCancel'
  if (!this[$type]) {
    this[$type] = this.$modal.querySelector(`[data-role="${type}"]`)
    listeners[onType] = callback ? () => callback(this) : () => this.hide()
    this[$type].addEventListener('click', listeners[onType])
  }
  if (this[$type] && callback) {
    this[$type].removeEventListener('click', listeners[onType])
    listeners[onType] = () => callback(this)
    this[$type].addEventListener('click', listeners[onType])
  }
  this[$type].innerHTML = text

  return this
}

GmAlert.prototype.setOK = function (okText, onOK) {
  return setOKorCancel.call(this, 'ok', okText, onOK)
}

GmAlert.prototype.setCancel = function (cancelText, onCancel) {
  const _onCancel = () => {
    this.hide()
    onCancel && onCancel(this)
  }

  return setOKorCancel.call(this, 'cancel', cancelText, _onCancel)
}

export default GmAlert

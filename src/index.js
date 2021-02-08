import { isPlainObject, isFunction, isUndefined, fadeIn, fadeOut } from './utils'

let i = 0

function createMask() {
  const $mask = document.createElement('div')
  $mask.setAttribute('class', 'gm-alert-mask')
  $mask.setAttribute('id', `ga-${i++}`)
  $mask.style.display = 'none'
  $mask.innerHTML = `<div data-role="modal"><div data-role="title"></div><div data-role="body"></div><div data-role="footer"><button data-role="ok">确定</button><button data-role="cancel">取消</button></div></div>`
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
    title = '',
    titleClassName = '',
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

  const instance = { ...config }

  instance.__proto__ = GmAlert.prototype

  instance.$mask = createMask()
  maskClosAble && instance.$mask.addEventListener('click', () => instance.hide())

  instance.$modal = instance.$mask.querySelector('[data-role="modal"]')
  instance.$modal.addEventListener('click', e => e.stopPropagation())

  // Some elements
  instance.$title = instance.$modal.querySelector('[data-role="title"]')
  instance.$body = instance.$modal.querySelector('[data-role="body"]')
  instance.$footer = instance.$modal.querySelector('[data-role="footer"]')
  instance.$ok = instance.$footer.querySelector('[data-role="ok"]')
  instance.$cancel = instance.$footer.querySelector('[data-role="cancel"]')

  // Set title
  instance.$title.innerHTML = title
  instance.$title.style.display = title ? 'block' : 'none'
  titleClassName && instance.$title.setAttribute('class', titleClassName)

  // Set body
  instance.$body.innerHTML = body
  bodyClassName && instance.$body.setAttribute('class', bodyClassName)

  // Set footer
  footerClassName && instance.$footer.setAttribute('class', footerClassName)
  if (!showFooter) instance.$footer.style.display = 'none'

  // Set OK button
  instance.$ok.innerHTML = okText
  instance.$ok.addEventListener('click', onOK ?? (() => instance.hide()))

  // Set cancel button
  instance.$cancel.innerHTML = cancelText
  instance.$cancel.addEventListener('click', onCancel ?? (() => instance.hide()))

  // Show modal or not
  isShow && instance.show()

  return instance
}

GmAlert.prototype.show = function () {
  fadeIn(this.$mask, 'flex')
  this.isShow = true
  return this
}

GmAlert.prototype.hide = function () {
  fadeOut(this.$mask)
  this.isShow = false
  return this
}

export default GmAlert

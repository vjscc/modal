import { isPlainObject, isFunction, fadeIn, fadeOut, $$ } from './utils'

const mask = document.createElement('div')

function createMask() {
  mask.setAttribute('class', 'gm-alert-mask')
  mask.style.display = 'none'
  mask.innerHTML = `<div class="modal"><div class="title"></div><div class="body"></div><div class="footer"><button data-type="ok">确定</button><button data-type="cancel">取消</button></div></div>`
  document.body.append(mask)
}

if (document.body) {
  createMask()
} else {
  window.addEventListener('load', createMask)
}

// Stop propagation when click modal
const modal = $$('.modal', mask)
modal.addEventListener('click', e => e.stopPropagation())

let currentOnOK
let currentOnCancel

const showAlert = config => {
  // The config must be a plain object
  if (!isPlainObject(config)) {
    throw new ReferenceError('config is not plain object')
  }

  // destruct config
  const {
    title = '',
    titleClassName = '',
    body = '',
    bodyClassName = '',
    footerClassName = '',
    okText = 'ok',
    onOK = hideAlert,
    cancelText = 'cancel',
    onCancel = hideAlert,
    maskClosAble = true
  } = config

  // validate config item
  if (!isFunction(onOK)) {
    throw new ReferenceError('onOK is not a function')
  }
  if (!isFunction(onCancel)) {
    throw new ReferenceError('onCancel is not a function')
  }

  // Some elements
  const _title = $$('.title', modal)
  const _body = $$('.body', modal)
  const footer = $$('.footer', modal)
  const okBtn = $$('[data-type="ok"]', footer)
  const cancelBtn = $$('[data-type="cancel"]', footer)

  // Set title
  _title.innerHTML = title
  _title.style.display = title ? 'block' : 'none'
  _title.setAttribute('class', `title ${titleClassName}`)

  // Set body
  _body.innerHTML = body
  _body.setAttribute('class', `body ${bodyClassName}`)

  // Set footer
  footer.setAttribute('class', `footer ${footerClassName}`)

  // Set OK button
  okBtn.innerHTML = okText
  okBtn.removeEventListener('click', currentOnOK)
  okBtn.addEventListener('click', (currentOnOK = onOK))

  // Set cancel button
  if (cancelText) {
    cancelBtn.style.display = 'inline-block'
    cancelBtn.innerHTML = cancelText
    cancelBtn.removeEventListener('click', currentOnCancel)
    cancelBtn.addEventListener('click', (currentOnCancel = onCancel))
  } else {
    cancelBtn.style.display = 'none'
  }

  // Set mask of modal
  mask.removeEventListener('click', currentOnCancel)
  if (maskClosAble) {
    mask.addEventListener('click', (currentOnCancel = onCancel))
  }
  fadeIn(mask, 'flex')
}

const hideAlert = () => fadeOut(mask)

export { showAlert, hideAlert }

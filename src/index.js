import { isPlainObject, isFunction, fadeIn, fadeOut, $$ } from './utils'

!(function (w) {
  const mask = document.createElement('div')
  mask.setAttribute('class', 'shineyue-alert-mask')
  mask.style.display = 'none'
  mask.innerHTML = `<div class="modal"><div class="title"></div><div class="body"></div><div class="footer"><button data-type="ok">确定</button><button data-type="cancel">取消</button></div></div>`
  if (document.body) {
    document.body.append(mask)
  } else {
    throw new Error('window is not loaded, please call showAlert after window is onload')
  }

  // 停止点击冒泡
  const modal = $$('.modal', mask)
  modal.addEventListener('click', e => e.stopPropagation())

  let currentOnOK
  let currentOnCancel

  w.showAlert = config => {
    // 配置必须是纯对象
    if (!isPlainObject(config)) {
      throw new ReferenceError('config is not plain object')
    }

    // 解构配置项
    const {
      title = '',
      titleClassName = '',
      body = '',
      bodyClassName = '',
      footerClassName = '',
      okText = 'ok',
      onOK = () => void 0,
      cancelText = 'cancel',
      onCancel = () => w.hideAlert(),
      maskClosAble = true
    } = config

    // 判断配置类型
    if (!isFunction(onOK)) {
      throw new ReferenceError('onOK is not a function')
    }
    if (!isFunction(onCancel)) {
      throw new ReferenceError('onCancel is not a function')
    }

    // 定义元素节点
    const _title = $$('.title', modal)
    const _body = $$('.body', modal)
    const footer = $$('.footer', modal)
    const okBtn = $$('[data-type="ok"]', footer)
    const cancelBtn = $$('[data-type="cancel"]', footer)

    // 设置标题
    _title.innerHTML = title
    _title.style.display = title ? 'block' : 'none'
    _title.setAttribute('class', `title ${titleClassName}`)

    // 设置内容
    _body.innerHTML = body
    _body.setAttribute('class', `body ${bodyClassName}`)

    // 设置底部
    footer.setAttribute('class', `footer ${footerClassName}`)

    // 设置确定按钮
    okBtn.innerHTML = okText
    okBtn.removeEventListener('click', currentOnOK)
    okBtn.addEventListener('click', (currentOnOK = onOK))

    // 设置取消按钮
    if (cancelText) {
      cancelBtn.style.display = 'inline-block'
      cancelBtn.innerHTML = cancelText
      cancelBtn.removeEventListener('click', currentOnCancel)
      cancelBtn.addEventListener('click', (currentOnCancel = onCancel))
    } else {
      cancelBtn.style.display = 'none'
    }

    // 设置遮罩层
    mask.removeEventListener('click', currentOnCancel)
    if (maskClosAble) {
      mask.addEventListener('click', (currentOnCancel = onCancel))
    }
    fadeIn(mask, 'flex')
  }
  w.hideAlert = () => fadeOut(mask)
})(window)

import {
  fadeIn,
  fadeOut,
  isStringOrHTMLElement,
  stringOrHTMLElement,
  getElementViaStringOrHTMLElement
} from './utils'

let i = 0
const listenerMap = new Map<string, eventHandler>()

type eventHandler = (this: HTMLElement, ev: MouseEvent) => void
type handler = (this: VjsccModal, ev: MouseEvent) => void

interface IVjsccModal {
  id: number
  isShow: boolean
  maskClose: boolean
  maskColor?: string
  $mask: HTMLElement
  $modal: HTMLElement
  $header?: HTMLElement
  $body?: HTMLElement
  $footer?: HTMLElement
  $ok?: HTMLElement
  $cancel?: HTMLElement
  show: () => VjsccModal
  hide: () => VjsccModal
  setOnOK: (fn: handler) => VjsccModal
  setOnCancel: (fn: handler) => VjsccModal
}

interface IVjsccModalConstructorOptions {
  $mask: stringOrHTMLElement
  isShow?: boolean
  maskClose?: boolean
  maskColor?: string
  onOK?: handler
  onCancel?: handler
}

class VjsccModal implements IVjsccModal {
  id: number
  isShow: boolean
  maskClose: boolean
  maskColor?: string
  $mask: HTMLElement
  $modal: HTMLElement
  $header?: HTMLElement
  $body?: HTMLElement
  $footer?: HTMLElement
  $ok?: HTMLElement
  $cancel?: HTMLElement
  constructor(options: IVjsccModalConstructorOptions) {
    const { $mask, isShow = false, maskClose = true, maskColor, onOK, onCancel } = options

    if (!isStringOrHTMLElement($mask)) {
      throw new TypeError(
        `Initial config 'options.$mask' should be type 'string' or 'HTMLElement'.`
      )
    }

    // Find and set $mask.
    const _$mask = getElementViaStringOrHTMLElement($mask)
    if (!_$mask) {
      throw new Error(`Can not get correct element via 'options.$mask', please check out.`)
    }
    this.$mask = _$mask

    // Find and set $modal.
    const $modal = getElementViaStringOrHTMLElement('.vjscc-modal', this.$mask)
    if (!$modal) {
      throw new Error(`Can not get correct element '.vjsc-modal', please check out your HTML.`)
    }
    this.$modal = $modal

    // Find and set $header.
    const $header = getElementViaStringOrHTMLElement('.vjscc-modal-header', this.$modal)
    if ($header) this.$header = $header

    // Find and set $body.
    const $body = getElementViaStringOrHTMLElement('.vjscc-modal-body', this.$modal)
    if ($body) this.$body = $body

    // Find and set $footer.
    const $footer = getElementViaStringOrHTMLElement('.vjscc-modal-footer', this.$modal)
    if ($footer) this.$footer = $footer

    // Find and set $ok.
    const $ok = getElementViaStringOrHTMLElement('.vjscc-modal-footer-btn-ok', this.$footer)
    if ($ok) this.$ok = $ok

    // Find and set $cancel.
    const $cancel = getElementViaStringOrHTMLElement('.vjscc-modal-footer-btn-cancel', this.$cancel)
    if ($cancel) this.$cancel = $cancel

    this.id = i++
    this.isShow = isShow
    this.maskClose = maskClose

    if (maskColor) {
      this.maskColor = maskColor
      this.$mask.style.backgroundColor = this.maskColor
    }

    // If show dierectly.
    if (isShow) {
      this.show()
    }

    // Add click event when to close when mask is clicked.
    if (maskClose) {
      this.$mask.addEventListener('click', this.hide)
      this.$modal.addEventListener('click', e => e.stopImmediatePropagation())
    }

    // Set onOK and onCancel.
    if (onOK && this.$ok) {
      this.setOnOK(onOK)
    }
    if (this.$cancel) {
      this.setOnCancel(onCancel ?? this.hide)
    }
  }
  show = (): VjsccModal => {
    fadeIn(this.$mask, '')
    this.isShow = true
    return this
  }
  hide = (): VjsccModal => {
    fadeOut(this.$mask)
    this.isShow = false
    return this
  }
  setOnOK = (fn: handler): VjsccModal => {
    if (!this.$ok) {
      console.warn(
        `Can not get correct '$ok' element when set 'onOK()', please checkout your HTML.`
      )
      return this
    }

    const id = 'ok_' + this.id
    const prevHandler = listenerMap.get(id)
    if (prevHandler) {
      this.$ok.removeEventListener('click', prevHandler)
    }

    const handler: eventHandler = (e: MouseEvent) => fn.call(this, e)
    this.$ok.addEventListener('click', handler)
    listenerMap.set(id, handler)

    return this
  }
  setOnCancel = (fn: handler): VjsccModal => {
    if (!this.$cancel) {
      console.warn(
        `Can not get correct '$cancel' element when set 'onCancel()', please checkout your HTML.`
      )
      return this
    }

    const id = 'cancel_' + this.id
    const prevHandler = listenerMap.get(id)
    if (prevHandler) {
      this.$cancel.removeEventListener('click', prevHandler)
    }

    const handler: eventHandler = (e: MouseEvent) => fn.call(this, e)
    this.$cancel.addEventListener('click', handler)
    listenerMap.set(id, handler)

    return this
  }
}

export default VjsccModal

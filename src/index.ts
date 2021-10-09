import { isString } from '@vjscc/utils'
import {
  fadeIn,
  fadeOut,
  isStringOrHTMLElement,
  stringOrHTMLElement,
  getElementViaStringOrHTMLElement
} from './utils'

let i = 0
const listenerMap = new Map()

interface IVjsccModal {
  id: number
  isShow: boolean
  maskClose: boolean
  $mask: HTMLElement
  $modal: HTMLElement
  show: () => IVjsccModal
  hide: () => IVjsccModal
}

interface IVjsccModalConstructorOptions {
  $mask: stringOrHTMLElement
  isShow?: boolean
  maskClose?: boolean
}

class VjsccModal implements IVjsccModal {
  id: number
  isShow: boolean
  maskClose: boolean
  $mask: HTMLElement
  $modal: HTMLElement
  constructor(options: IVjsccModalConstructorOptions) {
    const { $mask, isShow = false, maskClose = true } = options

    if (!isStringOrHTMLElement($mask)) {
      throw new TypeError(
        `Initial config 'options.$mask' should be type 'string' or 'HTMLElement'.`
      )
    }

    const _$mask = getElementViaStringOrHTMLElement($mask)
    if (!_$mask) {
      throw new Error(`Can not get correct element via 'options.$mask', please check out.`)
    }

    this.$mask = _$mask

    const $modal = getElementViaStringOrHTMLElement('.vjscc-modal', this.$mask)
    if (!$modal) {
      throw new Error(`Can not get correct element '.vjsc-modal', please check out your HTML.`)
    }

    this.$modal = $modal

    this.id = i++
    this.isShow = isShow
    this.maskClose = maskClose

    if (isShow) {
      this.show()
    }

    if (maskClose) {
      this.$mask.addEventListener('click', this.hide)
      this.$modal.addEventListener('click', e => e.stopImmediatePropagation())
    }
  }
  show = (): IVjsccModal => {
    fadeIn(this.$mask, '')
    this.isShow = true
    return this
  }
  hide = (): IVjsccModal => {
    fadeOut(this.$mask)
    this.isShow = false
    return this
  }
}

export default VjsccModal

import { isString } from '@vjscc/utils'
import {
  fadeIn,
  fadeOut,
  changeNodeContent,
  isStringOrHTMLElement,
  stringOrHTMLElement,
  getElementViaStringOrHTMLElement
} from './utils'

let i = 0
const listenerMap = new Map()

interface IVjsccModal {
  id: number
  show: boolean
  $mask: HTMLElement
}

interface IVjsccModalConstructorOptions {
  $mask: stringOrHTMLElement
  show: boolean
}

class VjsccModal implements IVjsccModal {
  id: number
  show: boolean
  $mask: HTMLElement
  constructor(options: IVjsccModalConstructorOptions) {
    const { $mask, show = false } = options

    if (!isStringOrHTMLElement($mask)) {
      throw new TypeError(
        `Initial config 'options.$mask' should be type 'string' or 'HTMLElement'.`
      )
    }

    const _$mask = getElementViaStringOrHTMLElement($mask)
    if (!_$mask) {
      throw new Error(`Can not get correct elemt via 'options.$mask', please check out.`)
    }

    this.$mask = _$mask

    this.id = i++
    this.show = show
  }
}

export default VjsccModal

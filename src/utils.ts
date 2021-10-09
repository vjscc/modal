import { isString, isHTMLElement } from '@vjscc/utils'

const step = 0.025

/**
 * Let dom element fade out.
 *
 * @param el Dom element.
 */
export function fadeOut(el: HTMLElement): void {
  el.style.opacity = '1'
  ;(function fade() {
    const current = parseFloat(el.style.opacity)
    if (current < step) {
      el.style.display = 'none'
    } else {
      el.style.opacity = (current - step).toString()
      requestAnimationFrame(fade)
    }
  })()
}

/**
 * Let dom element fade in.
 *
 * @param el dom element.
 * @param display dispaly after element in.
 */
export function fadeIn(el: HTMLElement, display = 'block'): void {
  el.style.opacity = '0'
  el.style.display = display
  ;(function fade() {
    const current = parseFloat(el.style.opacity)
    if (current + step <= 1) {
      el.style.opacity = (current + step).toString()
      requestAnimationFrame(fade)
    }
  })()
}

/**
 * Check if value is a string or HTMLELement.
 *
 * @param value Target value to check.
 * @returns True if it is string or HTMLELement, false otherwise.
 */
export function isStringOrHTMLElement(value: unknown): boolean {
  return isString(value) || isHTMLElement(value)
}

export type stringOrHTMLElement = string | HTMLElement

/**
 * Get element via string or HTMLElement.
 *
 * @param stringOrHTMLElement String or HTMLElement.
 * @param container Where to find, default is `document`.
 * @returns HTMLElement or null if not found or fail.
 */
export function getElementViaStringOrHTMLElement(
  stringOrHTMLElement: stringOrHTMLElement,
  container: HTMLElement | Document = document
): HTMLElement | null {
  if (isHTMLElement(stringOrHTMLElement)) {
    return stringOrHTMLElement as HTMLElement
  }
  try {
    return container.querySelector(stringOrHTMLElement as string)
  } catch (err) {
    console.error(err)
    return null
  }
}

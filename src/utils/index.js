/**
 * let dom element fade out
 * @param {HTMLElement} el dom element
 */
export function fadeOut(el) {
  el.style.opacity = 1
  ;(function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = 'none'
    } else {
      requestAnimationFrame(fade)
    }
  })()
}

/**
 * let dom element fade in
 * @param {HTMLElement} el dom element
 * @param {string} display dispaly after element in
 */
export function fadeIn(el, display = 'block') {
  el.style.opacity = 0
  el.style.display = display
  ;(function fade() {
    let val = parseFloat(el.style.opacity)
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val
      requestAnimationFrame(fade)
    }
  })()
}

const toString = Object.prototype.toString

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
export function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false
  }
  if (Object.getPrototypeOf(value) === null) {
    return true
  }
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 */
export function isFunction(value) {
  return typeof value === 'function'
}

/**
 * DOM selector
 *
 * @param {string} selector dom element selector
 * @param {HTMLElement} el dom element, default is `doucment`
 * @returns {HTMLElement} dom element
 */
export function $$(selector, el = document) {
  return el.querySelector(selector)
}

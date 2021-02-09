let header = ''
let headerClass = ''
let body = ''
let bodyClass = ''
let footerClass = ''
let okText = 'ok'
let cancelText = 'cancel'

const alert = window.GmAlert({
  header,
  headerClass,
  body,
  bodyClass,
  footerClass,
  okText,
  cancelText,
  showFooter: true,
  maskCloseAble: true,
  isShow: false
})

const $form = document.querySelector('form')
const $header = $form.querySelector('#header')
const $headerClass = $form.querySelector('#header-class')
const $body = $form.querySelector('#body')
const $bodyClass = $form.querySelector('#body-class')
const $footerClass = $form.querySelector('#footer-class')
const $ok = $form.querySelector('#ok')
const $cancel = $form.querySelector('#cancel')

$form.addEventListener('submit', e => {
  e.preventDefault()
  header = $header.value
  headerClass = $headerClass.value
  body = $body.value
  bodyClass = $bodyClass.value
  footerClass = $footerClass.value
  okText = $ok.value
  cancelText = $cancel.value

  alert
    .setHeader(header, headerClass)
    .setBody(body, bodyClass)
    .setFooter(true, footerClass)
    .setOK(okText)
    .setCancel(cancelText)
    .show()
})

window.a = alert

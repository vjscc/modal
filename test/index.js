/** @type {typeof import('..').default} */
const VjsccModal = window.VjsccModal

VjsccModal.config({
  isShow: true,
  maskClose: false,
  maskColor: '#32abf1'
})

const modal = new VjsccModal({
  duration: 1000,
  $mask: '.vjscc-modal-mask',
  onOK: function (e) {
    console.log(e, this)
  }
})

console.log(modal)

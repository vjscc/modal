window.VjsccModal.config({
  isShow: true,
  maskClose: false,
  maskColor: '#32abf1'
})

const modal = new window.VjsccModal({
  $mask: '.vjscc-modal-mask',
  onOK: function (e) {
    console.log(e, this)
  }
})

window.m = modal

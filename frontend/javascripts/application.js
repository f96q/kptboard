window.jQuery = require('jquery')
require('bootstrap-sass/assets/javascripts/bootstrap/dropdown')

window.onload = () => {
  if (document.getElementsByClassName('js-retrospective')[0]) {
    require('./')
  }
}

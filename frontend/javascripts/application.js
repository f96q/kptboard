window.onload = () => {
  let dropdown = document.getElementsByClassName('dropdown')[0]
  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('open')
  })

  if (document.getElementsByClassName('js-retrospective')[0]) {
    require('./')
  }
}

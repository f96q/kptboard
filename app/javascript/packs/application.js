import React from 'react'
import Modal from 'react-modal'
import { render } from 'react-dom'
import App from '../src/containers/App'

window.onload = () => {
  const dropdown = document.getElementsByClassName('dropdown')[0]
  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('open')
  })
  const retrospective = document.getElementsByClassName('js-retrospective')[0]
  if (retrospective) {
    const retrospectiveId = retrospective.getAttribute('data-id')
    Modal.setAppElement(retrospective)
    render(<App retrospectiveId={retrospectiveId} />, retrospective)
  }
}

import React from 'react'
import Modal from 'react-modal'
import { render } from 'react-dom'
import App from './containers/App'

const retrospective = document.getElementsByClassName('js-retrospective')[0]
const retrospectiveId = retrospective.getAttribute('data-id')

Modal.setAppElement(retrospective)
render(<App retrospectiveId={retrospectiveId} />, retrospective)

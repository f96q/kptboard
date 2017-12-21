// @flow

import React from 'react'
import Modal from 'react-modal'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import actionCable from './middlewares/actionCable'
import reducer from './reducers'
import App from './containers/App'

const retrospective = document.getElementsByClassName('js-retrospective')[0]
const retrospectiveId = retrospective.getAttribute('data-id')
const store = createStore(
  reducer,
  applyMiddleware(actionCable)
)

Modal.setAppElement(retrospective)

store.dispatch({ type: 'ACTION_CABLE_CREATE', retrospectiveId: retrospectiveId })

render((
  <Provider store={store}>
    <App />
  </Provider>
), retrospective)

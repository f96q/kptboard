import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'
import channel from './channels'

let retrospective = document.getElementsByClassName('js-retrospective')[0]
const retrospectiveId = retrospective.getAttribute('data-id')

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

channel.create(retrospectiveId, store)

render((
  <Provider store={store}>
    <App />
  </Provider>
), retrospective)
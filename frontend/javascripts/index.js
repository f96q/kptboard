import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import channel from './channels'

let retrospective = document.getElementsByClassName('js-retrospective')[0]
const retrospectiveId = retrospective.getAttribute('data-id')
const store = configureStore()

channel.create(retrospectiveId, store)

render((
  <Provider store={store}>
    <App />
  </Provider>
), retrospective)

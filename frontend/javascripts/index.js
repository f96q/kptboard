import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ActionCable from 'actioncable'
import humps from 'humps'
import reducer from './reducers'
import App from './containers/App'
import { SET_SUBSCRIPTIONS } from './constants/ActionTypes'

const retrospective = document.getElementsByClassName('js-retrospective')[0]
const retrospectiveId = retrospective.getAttribute('data-id')
const store = createStore(reducer)

const cable = ActionCable.createConsumer()
const retrospectivesSubscription = cable.subscriptions.create({ channel: 'RetrospectivesChannel', room: retrospectiveId }, {
  connected: function() {
    this.perform('open');
  },
  received: (data) => {
    store.dispatch(humps.camelizeKeys(data))
  }
})

const retrospectivesUsersSubscription = cable.subscriptions.create({ channel: 'RetrospectivesUsersChannel', room: retrospectiveId }, {
  received: (data) => {
    store.dispatch(humps.camelizeKeys(data))
  }
})

const labelsSubscription = cable.subscriptions.create({ channel: 'LabelsChannel', room: retrospectiveId }, {
  received: (data) => {
    store.dispatch(humps.camelizeKeys(data))
  }
})

store.dispatch({type: SET_SUBSCRIPTIONS, subscriptions: { retrospectives: retrospectivesSubscription, retrospectivesUsers: retrospectivesUsersSubscription, labels: labelsSubscription }})

render((
  <Provider store={store}>
    <App />
  </Provider>
), retrospective)

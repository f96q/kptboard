import React from 'react'
import { Provider } from 'react-redux'
import { Retrospective } from '../components/Retrospective'
import { LabelModal } from '../components/LabelModal'
import { Alert } from '../components/Alert'
import { configureStore } from '../store/configureStore'

export function App(props) {
  const store = configureStore()
  store.dispatch({ type: 'ACTION_CABLE_CREATE', retrospectiveId: props.retrospectiveId })
  return (
    <Provider store={store}>
      <div>
        <Alert />
        <Retrospective />
        <LabelModal />
      </div>
    </Provider>
  )
}

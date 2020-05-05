import React from 'react'
import { Provider } from 'react-redux'
import { Retrospective } from '../components/Retrospective'
import { LabelModal } from '../components/LabelModal'
import { Alert } from '../components/Alert'
import { ActionCable } from '../components/ActionCable'
import { configureStore } from '../store/configureStore'

export const App = (props) => {
  const store = configureStore()

  return (
    <Provider store={store}>
      <div>
        <ActionCable retrospectiveId={props.retrospectiveId} />
        <Alert />
        <Retrospective />
        <LabelModal />
      </div>
    </Provider>
  )
}

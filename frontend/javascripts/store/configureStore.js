import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import actionCable from '../middlewares/actionCable'

export function configureStore() {
  return createStore(
    reducer,
    applyMiddleware(actionCable)
  )
}

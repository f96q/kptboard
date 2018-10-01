import { createStore } from 'redux'
import { rootReducer } from '../reducers'

export function configureStore() {
  return createStore(rootReducer)
}

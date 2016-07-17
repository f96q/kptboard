import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk)
  )
  return store
}

import {
  buildActionCreator,
  createReducer
} from 'hard-reducer'

const {
  createAction
} = buildActionCreator({
  prefix: 'app/'
})

const initialState = {
  alert: {
    type: null,
    messages: []
  }
}

export const setAlert = createAction('set-alert')
export const clearAlert = createAction('clear-alert')

export const reducer = createReducer(initialState)
  .case(setAlert, (state, payload) => {
    return {
      ...state,
      alert: payload.alert
    }
  })
  .case(clearAlert, (state, payload) => {
    return initialState
  })

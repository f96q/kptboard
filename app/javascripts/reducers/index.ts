import { combineReducers } from 'redux'
import * as app from './app'
import * as label from './label'
import * as user from './user'
import * as channel from './channel'

export const rootReducer = combineReducers({
  app: app.reducer,
  label: label.reducer,
  user: user.reducer,
  channel: channel.reducer
})

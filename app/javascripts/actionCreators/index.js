import { connect } from 'react-redux'
import { compose } from 'redux'

import * as global from './globalActions'
import * as app from '../reducers/app'
import * as label from '../reducers/label'
import * as user from '../reducers/user'
import * as channel from '../reducers/channel'

export const actions = {
  global,
  app,
  label,
  user,
  channel
}

export const connector = (stateSelector, actionSelector, ...hocs) => {
  return compose(
    connect(
      stateSelector,
      actionSelector(actions)
    ),
    ...hocs
  )
}

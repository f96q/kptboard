import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import * as Actions from '../actions'

export const connector = (stateSelector, actionSelector, ...hocs) => {
  return compose(
    connect(
      stateSelector,
      (dispatch) => {
        return bindActionCreators(actionSelector(Actions), dispatch)
      }
    ),
    ...hocs
  )
}

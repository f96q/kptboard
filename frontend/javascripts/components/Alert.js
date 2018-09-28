import React from 'react'
import { lifecycle } from 'recompose'
import { connector } from '../actionCreators'

export const Alert = connector(
  state => ({
    alert: state.application.alert
  }),
  actions => ({
    clearAlert: actions.clearAlert
  }),
  lifecycle({
    componentDidUpdate() {
      if (this.props.alert.messages.length == 0) {
        return
      }
      setTimeout(() => {
        this.props.clearAlert()
      }, 5000)
    }
  })
)(function AlertImpl(props) {
  const { alert, clearAlert } = props
  if (alert.messages.length == 0) {
    return null
  }
  const messages = alert.messages.map((message, i) => {
    return (<div key={`message-${i + 1}`} className="Alert-message">{message}</div>)
  })
  if (alert.type == null) {
    return null
  }
  return (
    <div className={`Alert is-${alert.type}`}>
      <div className="Alert-messages">{messages}</div>
    </div>
  )
})



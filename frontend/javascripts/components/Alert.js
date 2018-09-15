import React, { Component } from 'react'
import { lifecycle } from 'recompose'

const Alert = ({ alert, clearAlert }) => {
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
}

export default lifecycle({
  componentDidUpdate() {
    if (this.props.alert.messages.length == 0) {
      return
    }
    setTimeout(() => {
      this.props.clearAlert()
    }, 5000)
  }
})(Alert)


// @flow

import React, { Component } from 'react'
import type { Alert as AlertType } from '../types/application'
import type { clearAlert } from '../types/actions'

type Props = {
  alert: AlertType,
  clearAlert: clearAlert
}

export default class Alert extends Component {
  props: Props

  componentDidUpdate() {
    if (this.props.alert.messages.length == 0) {
      return
    }
    setTimeout(() => {
      this.props.clearAlert()
    }, 5000)
  }

  render() {
    if (this.props.alert.messages.length == 0) {
      return null
    }
    const messages = this.props.alert.messages.map((message, i) => {
      return (<div key={`message-${i + 1}`} className="Alert-message">{message}</div>)
    })
    if (this.props.alert.type == null) {
      return null
    }
    return (
      <div className={`Alert is-${this.props.alert.type}`}>
        <div className="Alert-messages">{messages}</div>
      </div>
    )
  }
}

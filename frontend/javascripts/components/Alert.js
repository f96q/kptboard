import React, { Component, PropTypes } from 'react'

export default class Alert extends Component {
  componentDidUpdate() {
    if (this.props.alert.messages.length == 0) {
      return
    }
    setTimeout(() => {
      this.props.actions.clearAlert()
    }, 5000)
  }

  render() {
    if (this.props.alert.messages.length == 0) {
      return null
    }
    const messages = this.props.alert.messages.map((message, i) => {
      return (<div key={`message-${i + 1}`} className="Alert-message">{message}</div>)
    })
    return (
      <div className={`Alert is-${this.props.alert.type}`}>
        <div className="Alert-messages">{messages}</div>
      </div>
    )
  }
}

Alert.propTypes = {
  alert: PropTypes.shape({
    messages: PropTypes.array.isRequired
  }).isRequired
}

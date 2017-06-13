import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserItem extends Component {
  removeUser() {
    if (window.confirm(`remove user ${this.props.user.name}`)) {
      this.props.actions.removeUser(this.props.user.id)
    }
  }

  removeButton() {
    return (
      <i className="UserItem-remove fa fa-remove" onClick={this.removeUser.bind(this)}></i>
    )
  }

  render() {
    return (
      <div className="UserItem">
        <div className="fa fa-user">
          <div className="UserItem-name">{this.props.user.name}</div>
        </div>
        {this.props.isDestroy ? this.removeButton() : null}
      </div>
    )
  }
}

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  isDestroy: PropTypes.bool.isRequired
}

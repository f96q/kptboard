import React, { Component, PropTypes } from 'react'

export default class UserItem extends Component {
  removeUser() {
    if (window.confirm(`remove user ${this.props.user.name}`)) {
      this.props.removeUser(this.props.user.id)
    }
  }

  removeButton() {
    return (
      <i className="UserItem-remove fa fa-remove pull-right" onClick={this.removeUser.bind(this)}></i>
    )
  }

  render() {
    return (
      <div className="UserItem">
        <div className="fa fa-user">
          <div className="UserItem-name">{this.props.user.name}</div>
        </div>
        {this.props.isDestroy ? null : this.removeButton()}
      </div>
    )
  }
}

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  isDestroy: PropTypes.bool.isRequired,
  removeUser: PropTypes.func.isRequired
}

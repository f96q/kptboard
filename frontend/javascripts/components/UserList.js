import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserItem from './UserItem'

export default class UserList extends Component {
  addUser() {
    if (this.props.email) {
      this.props.actions.addUser(this.props.email)
    }
  }

  updateEmail(e) {
    this.props.actions.setEmail(e.target.value)
  }

  render() {
    const isDestroy = this.props.users.length > 1
    const users = this.props.users.map((user) => {
      return (
        <UserItem key={user.id}
                  user={user}
                  isDestroy={isDestroy}
                  actions={this.props.actions} />
      )
    })
    return (
     <div className="UserList">
        <input className="UserList-emailForm" type="email" placeholder="email" onChange={this.updateEmail.bind(this)}></input>
        <button className="UserList-emailFormButton fa fa-user-plus" type="button" onClick={this.addUser.bind(this)}></button>
        <div className="UserList-items">{users}</div>
     </div>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  email: PropTypes.string
}

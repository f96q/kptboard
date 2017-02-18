import React, { Component, PropTypes } from 'react'
import UserItem from './UserItem'

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '' }
  }

  addUser() {
    if (this.state.email) {
      this.props.actions.addUser(this.state.email)
      this.setState({ email: '' })
    }
  }

  updateEmail(e) {
    this.setState({ email: e.target.value })
  }

  render() {
    const users = this.props.users.map((user) => {
      return (
        <UserItem key={user.id}
                  user={user}
                  isDestroy={this.props.users.length == 1}
                  removeUser={this.props.actions.removeUser} />
      )
    })
    return (
      <div className="UserList">
        <input className="UserList-emailForm" type="email" placeholder="email" value={this.state.email} onChange={this.updateEmail.bind(this)}></input>
        <button className="UserList-emailFormButton fa fa-user-plus" type="button" onClick={this.addUser.bind(this)}></button>
        <div className="UserList-items">{users}</div>
      </div>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

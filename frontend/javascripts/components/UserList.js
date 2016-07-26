import React, { Component, PropTypes } from 'react'

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '' }
  }

  addUser() {
    if (this.state.email) {
      this.props.addUser(this.state.email)
      this.setState({ email: '' })
    }
  }

  removeUser(user) {
    if (confirm(`remove user ${user.name}`)) {
      this.props.removeUser(user.id)
    }
  }

  updateEmail(event) {
    this.setState({ email: event.target.value })
  }

  removeButton(user) {
    return (
      <i className="retrospective__user-remove-button fa fa-remove pull-right" onClick={this.removeUser.bind(this, user)}></i>
    )
  }

  render() {
    let users = this.props.users.map((user) => {
      return (
        <div className="retrospective__user" key={user.id}>
          <div className="fa fa-user">
            <div className="retrospective__user-name">{user.name}</div>
         </div>
         {this.props.users.length == 1 ? null : this.removeButton(user)}
        </div>
      )
    })
    return (
      <div className="retrospective__menu">
        <input className="retrospective__menu-email-form" type="email" placeholder="email" value={this.state.email} onChange={this.updateEmail.bind(this)}></input>
        <button className="retrospective__menu-email-form-button fa fa-user-plus" type="button" onClick={this.addUser.bind(this)}></button>
        <div className="retrospective__users">{users}</div>
      </div>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  addUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired
}

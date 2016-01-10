app.RetrospectiveMenu =

class RetrospectiveMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: null};
  }

  addUser() {
    if (this.state.email) {
      this.props.actions.addUser(this.state.email);
      this.setState({email: null});
    }
  }

  removeUser(user) {
    if (confirm(`remove user ${user.name}`)) {
      this.props.actions.removeUser(user.id);
    }
  }

  updateEmail(event) {
    this.setState({email: event.target.value});
  }

  removeButton(user) {
    return (
      <i className="fa fa-remove pull-right" onClick={this.removeUser.bind(this, user)}></i>
    );
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
    });
    return (
      <div className="retrospective__menu">
        <input className="retrospective__menu-email-form" type="email" placeholder="email" value={this.state.email} onChange={this.updateEmail.bind(this)}></input>
        <button className="retrospective__menu-email-form-button fa fa-user-plus" type="button" onClick={this.addUser.bind(this)}></button>
        <div className="retrospective__users">{users}</div>
      </div>
    );
  }
}

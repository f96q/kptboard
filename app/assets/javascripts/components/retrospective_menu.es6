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

  updateEmail(event) {
    this.setState({email: event.target.value});
  }

  render() {
    let users = this.props.users.map((user) => {
      return (
        <div className="retrospective__user" key={user.id}>
          <div className="fa fa-user">
            <div className="retrospective__user-name">{user.name}</div>
         </div>
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

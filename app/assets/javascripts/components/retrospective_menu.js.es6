'use strict';

class RetrospectiveMenu extends React.Component {
  addUser() {
    let email = this.refs.email.getDOMNode().value;
    if (email) {
      retrospectivesUserActions.create(this.props.retrospectiveId, email);
      this.refs.email.getDOMNode().value = null;
    }
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
        <input className="retrospective__menu-email-form" type="email" placeholder="email" ref="email"></input>
        <button className="retrospective__menu-email-form-button fa fa-user-plus" type="button" onClick={this.addUser.bind(this)}></button>
        <div className="retrospective__users">{users}</div>
      </div>
    );
  }
}

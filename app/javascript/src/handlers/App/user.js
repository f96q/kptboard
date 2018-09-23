export const addUser = ({ retrospectivesUsersChannel }) => email => {
  retrospectivesUsersChannel.perform('create', { email: email })
}

export const setAddUser = ({ setUsers, users }) => user => {
  setUsers([ ...users, user])
}

export const removeUser = ({ retrospectivesUsersChannel }) => id => {
  retrospectivesUsersChannel.perform('destroy', { id: id })
}

export const setRemoveUser = ({ setUsers, users }) => id => {
  const users = users.filter(user => user.id != id)
  setUsers(users)
}

export const setInvitationEmail = ({ setEmail }) => email => {
  setEmail(email)
}

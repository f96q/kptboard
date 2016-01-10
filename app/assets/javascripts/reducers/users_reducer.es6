(function() {

const initialState = {
  users: []
};

app.usersReducer =

function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case app.ActionTypes.SET_RETROSPECTIVE:
      return action.retrospective.users;
    break;

    case app.ActionTypes.ADD_USER: {
      return [...state, action.user];
    }
    break;

    case app.ActionTypes.REMOVE_USER: {
      return state.filter(user => user.id != action.id);
    }
    break;
  }
  return state;
}

})();

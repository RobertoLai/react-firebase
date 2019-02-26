const INITIAL_STATE = {
  users: null
};

const applySetUser = (state, action) => ({
  ...state,
  users: { [action.uid]: action.user }
});
const applySetUsers = (state, action) => ({
  ...state,
  users: action.user
});

function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "USERS_SET":
      return applySetUsers(state, action);
    case "USER_SET":
      return applySetUsers(state, action);

    default:
      return state;
  }
}

export default usersReducer
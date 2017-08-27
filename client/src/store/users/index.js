function addUsers(state, users) {
  return {
    ...state,
    ...users.map(u => (
      {
        [u.id]: {
          firstName: u.first_name,
          lastName: u.last_name,
          photo: u.photo,
          fetchingPhoto: u.fetchingPhoto || !!u.photo,
        }
      }
    )).reduce((acc, curr) => ({...acc, ...curr}), {})
  }
}

function updateUser(state, id, newState) {
  return {
    ...state,
    [id]: {
      ...state[id],
      ...newState,
    }
  }
}

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case '@USERS/ADD':
      return addUsers(state, payload);
    case '@USERS/UPDATE':
      return updateUser(state, payload.id, payload.newState);
    default:
      return state;
  }
}

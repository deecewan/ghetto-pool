function addUsers(state, users) {
  return {
    ...state,
    ...users.map(u => (
      {
        [u.id]: {
          firstName: u.first_name,
          lastName: u.last_name,
          photo: u.photo
        }
      }
    )).reduce((acc, curr) => ({...acc, ...curr}), {})
  }
}

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case '@USERS/ADD':
      return addUsers(state, payload);
    default:
      return state;
  }
}

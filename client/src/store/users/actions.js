function getPhoto(user) {
  return new Promise((resolve, reject) => {
    FB.api(`/${user.id}/picture`, (data) => {
      resolve({
        ...user,
        photo: data.url,
      });
    });
  });
}

export function addUser(user) {
  return addUsers([user]);
}

export function addUsers(users) {
  return (dispatch, getState) => {
    const userState = getState().users

    const ps = users
      .filter(u => !(userState.users[u.id] && userState.users[u.id].photo))
      .map(u => getPhoto(u.id));

    Promise.all(ps).then(users => dispatch({
      type: '@USERS/ADD',
      payload: users,
    }));
  }
}

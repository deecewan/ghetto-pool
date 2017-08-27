function getBaseUserData(id) {
  return new Promise((resolve, reject) => {
    FB.api(`/${id}`, 'GET', { fields: 'first_name,last_name' }, (data) => {
      resolve({ id, ...data })
    })
  })
}

function getPhoto(user) {
  return new Promise((resolve, reject) =>
    FB.api(`/${user.id}/picture`, 'GET', { type: 'large' }, ({ data }) =>
      resolve(data.url)
    )
  );
}

export function addUserById(id) {
  return (dispatch, getState) => {
    const userState = getState().users;

    if (userState[id] && userState[id].fetchingPhoto) {
      return Promise.resolve();
    }

    return getBaseUserData(id)
      .then(user => {
        dispatch({
          type: '@USERS/ADD',
          payload: [{ ...user, fetchingPhoto: true }],
        });
        return user;
      })
      .then(user => getPhoto(user))
      .then(url => dispatch({
        type: '@USERS/UPDATE',
        payload: { id: id, newState: { photo: url } }
      }))
  }
}

export function addUsers(users) {
  return (dispatch, getState) => {
    const userState = getState().users;
    const newUsers = users.filter(u => !(userState[u.id] && userState[u.id].fetchingPhoto));

    dispatch({
      type: '@USERS/ADD',
      payload: newUsers.map(u => ({ ...u, fetchingPhoto: true })),
    });

    return Promise.all(newUsers.map(u => getPhoto(u).then(url => [u.id, url])))
      .then(things => things.map(
      ([id, url]) => dispatch({
          type: '@USERS/UPDATE',
          payload: { id: id, newState: { photo: url } }
        })
      ));
  }
}

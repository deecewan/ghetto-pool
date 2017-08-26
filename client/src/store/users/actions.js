function getBaseUserData(id) {
  return new Promise((resolve, reject) => {
    FB.api(`/${id}`, 'GET', { fields: 'first_name,last_name' }, (data) => {
      resolve(data)
    })
  })
}

function getPhoto(user) {
  return new Promise((resolve, reject) => {
    FB.api(`/${user.id}/picture`, 'GET', { type: 'large' }, ({ data }) => {
      resolve({
        ...user,
        photo: data.url,
      });
    });
  });
}

export function addUserById(id) {
  return (dispatch, getState) => {
    const userState = getState().users

    if (userState[id] && userState[id].photo) {
      return
    }

    getBaseUserData(id)
      .then(user => getPhoto(user))
      .then(user => dispatch({
        type: '@USERS/ADD',
        payload: [user],
      }));
  }
}

export function addUsers(users) {
  return (dispatch, getState) => {
    const userState = getState().users

    const ps = users
      .filter(u => !(userState[u.id] && userState[u.id].photo))
      .map(u => getPhoto(u));

    Promise.all(ps).then(users => dispatch({
      type: '@USERS/ADD',
      payload: users,
    }));
  }
}

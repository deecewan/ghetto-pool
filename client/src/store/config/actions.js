import { addUserById } from "../users/actions";

export function markFBReady() {
  console.log('fb is ready');
  return {
    type: '@CONFIG/FB_READY',
  };
}

export function logIn(accessToken, id) {
  return (dispatch) => {
    dispatch(addUserById(id));
    return dispatch({
      type: '@CONFIG/LOGGED_IN',
      payload: { accessToken, id },
    });
  };
}

export function logOut() {
  return {
    type: '@CONFIG/LOGGED_OUT',
  };
}

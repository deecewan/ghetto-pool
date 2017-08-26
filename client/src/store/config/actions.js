export function markFBReady() {
  console.log('fb is ready');
  return {
    type: '@CONFIG/FB_READY',
  };
}

export function logIn(data) {
  return {
    type: '@CONFIG/LOGGED_IN',
    payload: data,
  };
}

export function logOut() {
  return {
    type: '@CONFIG/LOGGED_OUT',
  };
}

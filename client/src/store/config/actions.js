export function markFBReady() {
  console.log('fb is ready');
  return {
    type: '@CONFIG/FB_READY',
  };
}

export function logIn(accessToken) {
  return {
    type: '@CONFIG/LOGGED_IN',
    payload: accessToken,
  };
}

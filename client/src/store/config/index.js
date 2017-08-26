export default function reducer(state = { fbReady: false }, { type, payload }) {
  switch(type) {
    case '@CONFIG/FB_READY':
      return { ...state, fbReady: true };
    case '@CONFIG/LOGGED_IN':
      return { ...state, credentials: payload };
    default:
      return state;
  }
}

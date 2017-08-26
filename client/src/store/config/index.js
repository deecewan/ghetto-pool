
const initialState = { loggedIn: false, fbReady: false };

export default function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case '@CONFIG/FB_READY':
      return { ...state, fbReady: true };
    case '@CONFIG/LOGGED_IN':
      return { ...state, accessToken: payload, loggedIn: true };
    case '@CONFIG/LOGGED_OUT':
      return { ...state, accessToken: null, loggedIn: false };
    default:
      return state;
  }
}

export default function reducer(state = { fbReady: false }, { type, payload }) {
  switch(type) {
    case '@CONFIG/FB_READY':
      return { ...state, fbReady: true };
    default:
      return state;
  }
}

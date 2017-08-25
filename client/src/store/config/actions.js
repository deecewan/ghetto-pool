export function markFBReady() {
  console.log('fb is ready');
  return {
    type: '@CONFIG/FB_READY',
  };
}

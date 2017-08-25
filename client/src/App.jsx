import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { markFBReady } from './store/config/actions';
import Login from './views/Login';

window.fbAsyncInit = function() {
  FB.init({
    appId            : process.env.FACEBOOK_APP_ID,
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
  store.dispatch(markFBReady());
};

export default function App({ name = "World" }) {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

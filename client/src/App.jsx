import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'
import store from './store';
import { markFBReady } from './store/config/actions';
import Router from './Router';

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
      <AppContainer>
        <Router />
      </AppContainer>
    </Provider>
  );
}

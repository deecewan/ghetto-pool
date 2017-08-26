import React from 'react';
import { connect } from 'react-redux';
import Index from './views/Index';
import Login from './views/Login';

export function Router(props) {
  console.log(props.loggedIn);
  if (props.loggedIn) {
    return <Index />;
  }
  return <Login />;
}

export default connect(state => ({ loggedIn: state.config.loggedIn }))(Router);

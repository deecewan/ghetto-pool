import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Loader } from 'semantic-ui-react';
import axios from 'axios';
import logger from '../util/logger';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: null };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  checkLoggedIn() {
    FB.getLoginStatus((res) => {
      logger('getLoginStatus res', res);
      if (res.status === 'connected') {
        axios.post('/login', {
          data: res.authResponse,
        }).then(tokenInfo => {
          this.setState({ loggedIn: true });
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fbReady !== this.props.fbReady) {
      this.checkLoggedIn();
    }
  }

  onLoginClick() {
    FB.login(this.onLogin, { scope: 'public_profile,user_friends' })
  }

  onLogin(res) {
    logger('onLogin res', res);
    this.setState({ loggedIn: true });
  }

  getLoginButton() {
    if (this.state.loggedIn === null) {
      return <Loader active inline size="large">Loading...</Loader>
    }

    if (this.state.loggedIn === false) {
      return <Button onClick={this.onLoginClick}>Continue with Facebook</Button>
    }

    return <Button onClick={() => FB.logout(res => this.setState({ loggedIn: false }))}>Log Out</Button>
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}>
        <Header as="h1">Ghetto Pool Party</Header>
        {this.getLoginButton()}
      </div>
    )
  }
}

export default connect(state => ({ fbReady: state.config.fbReady }))(Login);

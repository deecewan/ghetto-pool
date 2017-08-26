import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Loader, Icon } from 'semantic-ui-react';
import axios from 'axios';
import logger from '../util/logger';
import { logIn } from '../store/config/actions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: null, loggingIn: false, error: null };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  checkLoggedIn() {
    FB.getLoginStatus((res) => {
      logger('getLoginStatus res', res);
      if (res.status === 'connected') {
        this.sendLogin(res);
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
    this.setState({ loggingIn: true, error: null });
    FB.login(this.onLogin, { scope: 'public_profile,user_friends' })
  }

  onLogin(res) {
    logger('onLogin res', res);
    this.sendLogin(res);
  }

  getLoginButton() {
    if (this.state.loggedIn === null || this.state.loggingIn) {
      return <Loader active inline size="large">{ this.state.loggingIn ? 'Logging In...' : 'Loading...'}</Loader>
    }

    if (this.state.loggedIn === false) {
      return (
        <Button onClick={this.onLoginClick}>
          <Icon.Group size='large'>
            <Icon name='facebook square' size="large" />
            <Icon corner name='add' />
          </Icon.Group>
          Continue with Facebook
        </Button>
      );
    }

    return <Button onClick={() => FB.logout(res => this.setState({ loggedIn: false }))}>Log Out</Button>
  }

  sendLogin(res) {
    axios.post('/login', {
      data: res.authResponse,
    }).then(({ data: { accessToken } }) => {
      this.setState({ loggedIn: true, loggingIn: false });
      this.props.dispatch(logIn(accessToken));
    })
    .catch(err => this.setState({ loggingIn: false, loggedIn: false, error: err.message }));
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
        {this.state.error}
      </div>
    )
  }
}

export default connect(state => ({ fbReady: state.config.fbReady }))(Login);

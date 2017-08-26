import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Loader, Icon } from 'semantic-ui-react';
import axios from 'axios';
import logger from '../util/logger';
import { logIn } from '../store/config/actions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loggingIn: false, error: null };

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
    FB.login(this.onLogin, { scope: 'public_profile,user_friends' });
  }

  onLogin(res) {
    logger('onLogin res', res);
    this.sendLogin(res);
  }

  getLoginButton() {
    if (!this.props.fbReady) {
      return <Loader active inline size="large">Loading...</Loader>
    }
    if (this.state.loggingIn) {
      return <Loader active inline size="large">Logging In...</Loader>
    }
    if (this.props.loggedIn === false) {
      return (
        <Button onClick={this.onLoginClick} color="facebook">
          <Icon.Group size='large'>
            <Icon name='facebook square' size="large" />
          </Icon.Group>
          Continue with Facebook
        </Button>
      );
    }

    return
  }

  sendLogin(res) {
    axios.post('/login', {
      data: res.authResponse,
    }).then(({ data: { accessToken, user_id } }) => {
      this.setState({ loggedIn: true, loggingIn: false });
      this.props.dispatch(logIn(accessToken, user_id));
    })
    .catch(err => this.setState({ loggingIn: false, loggedIn: false, error: err.message }));
  }

  render() {
    console.log(this.props, this.state);
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

export default connect(state => ({ fbReady: state.config.fbReady, loggedIn: state.config.loggedIn }))(Login);

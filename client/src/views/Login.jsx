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
      return <Loader active inverted inline size="large">Loading...</Loader>
    }
    if (this.state.loggingIn) {
      return <Loader active inverted inline size="large">Logging In...</Loader>
    }
    if (this.props.loggedIn === false) {
      return (
        <Button onClick={this.onLoginClick} color="facebook" size="large">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon.Group size='large'>
              <Icon name='facebook square' size="large" />
            </Icon.Group>
            <span style={{ paddingRight: "1rem" }}>
              Continue with Facebook
            </span>
          </div>
        </Button>
      );
    }

    return
  }

  getFadedIcons() {
    return (
      <div>
        <Icon name="car" size="huge" color="grey" />
        <Icon name="blind" size="huge" color="grey" />
        <Icon name="bus" size="huge" color="grey" />
        <Icon name="military" size="huge" color="grey" />
        <Icon name="ship" size="huge" color="grey" />
      </div>
    )
  }

  sendLogin(res) {
    axios.post('/login', {
      data: res.authResponse,
    }).then(({data: {access_token, user_id}}) => {
      this.setState({loggedIn: true, loggingIn: false});
      this.props.dispatch(logIn(access_token, user_id));
    })
      .catch(err => {
        console.log(err)
        this.setState({
          loggingIn: false,
          loggedIn: false,
          error: err.message
        });
      });
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, #505050, #303030)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxHeight: '20rem',
          height: '100%',
          flexDirection: 'column',
        }}>
          <Header dividing inverted size="huge" color="grey">GHETTO POOL</Header>
          {this.getFadedIcons()}
          <div>
            {this.getLoginButton()}
            {this.state.error}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ fbReady: state.config.fbReady, loggedIn: state.config.loggedIn }))(Login);

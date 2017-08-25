import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button } from 'semantic-ui-react';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: null };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  checkLoggedIn() {
    FB.getLoginStatus((res) => {
      if (res.status === 'connected') {
        this.setState({ loggedIn: true });
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
    console.log(res);
    this.setState({ loggedIn: true });
  }

  getLoginButton() {
    if (this.state.loggedIn === null) {
      return <Header as="h3">Loading...</Header>
    }

    if (this.state.loggedIn === false) {
      return <Button onClick={this.onLoginClick}>Continue with Facebook</Button>
    }

    return <Button onClick={() => FB.logout(res => console.log(res))}>Log Out</Button>
  }

  render() {
    console.log(this.props);
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}>
        <Header as="h1">Ghetto Pool</Header>
        {this.getLoginButton()}
      </div>
    )
  }
}

export default connect(state => ({ fbReady: state.config.fbReady }))(Login);

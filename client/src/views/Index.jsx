import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import { logOut } from '../store/config/actions';
import logger from '../util/logger';

export class Index extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentWillMount() {
    Notification && Notification.requestPermission(res => logger(`Notification Permission: ${res}.`));
  }

  getLogoutButton() {
    return <Button onClick={this.onLogoutClick}>Log Out</Button>
  }

  onLogoutClick() {
    FB.logout(this.onLogout)
  }

  onLogout(res) {
    console.log(res);
    this.props.logOut();
  }

  render() {
    return (
      <div>
        <Header as="h1">Ghetto Pool Party</Header>
        {this.getLogoutButton()}
      </div>
    )
  }
}

export default connect(() => ({}), { logOut })(Index)

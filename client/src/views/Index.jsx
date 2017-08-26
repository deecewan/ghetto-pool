import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logOut } from '../store/config/actions';

export class Index extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
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
        {this.getLogoutButton()}
      </div>
    )
  }
}

export default connect(() => ({}), { logOut })(Index)

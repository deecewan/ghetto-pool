import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Header, List, Image } from 'semantic-ui-react';
import { logOut } from '../store/config/actions';
import Travel from '../components/Travel';
import logger from '../util/logger';
import bg from '../util/background';

export class Index extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 'trips', passengers: [] };

    this.onLogout = this.onLogout.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onNewClick = this.onNewClick.bind(this);
    this.onTripsClick = this.onTripsClick.bind(this);
  }

  componentWillMount() {
    Notification && Notification.requestPermission(res => logger(`Notification Permission: ${res}.`));
    bg.start();
  }

  componentWillUnmount() {
    bg.stop();
  }

  getProfile() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        {this.props.profileImage && <Image
          shape="circular"
          src={this.props.profileImage}
          size="tiny"
          style={{ marginBottom: 10 }}
        />}
        Welcome Back, {this.props.profileName}.
      </div>
    )
  }

  getTravelButton() {
    return (
      <div style={{ padding: 40 }}>
        <Button.Group>
          <Button
            color={this.state.page === 'trips' ? 'grey' : null}
            content='Trips'
            onClick={this.onTripsClick}
          />
          <Button
            color={this.state.page === 'new' ? 'grey' : null}
            content='New Trip'
            onClick={this.onNewClick}
          />
        </Button.Group>
      </div>
    );
  }

  onNewClick() {
    this.setState({ page: 'new' });
  }

  onTripsClick() {
    this.setState({ page: 'trips' });
  }

  getTravellingList() {
    return <Travel />;
  }

  getLogoutButton() {
    return <Button onClick={this.onLogoutClick} icon="sign out" />
  }

  getBackButton() {
    return null;
  }

  getHeader() {
    return (
      <Grid columns={3} style={{ marginBottom: 20, display: 'flex', alignItems: 'center', marginTop: 0, padding: '0 5px' }}>
        <Grid.Row>
          <Grid.Column>{this.getBackButton()}</Grid.Column>
          <Grid.Column
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20
            }}
          >
            <span>Ghetto Pool</span>
          </Grid.Column>
          <Grid.Column textAlign="right">
            {this.getLogoutButton()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  onLogoutClick() {
    FB.logout(this.onLogout)
  }

  onLogout(res) {
    console.log(res);
    this.props.logOut();
  }

  getPage() {
    if (this.state.page === 'trips') {
      return "Here's yo trips";
    }

    return this.getTravellingList()
  }

  render() {
    return (
      <div>
        {this.getHeader()}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>

          {this.getProfile()}
          {this.getTravelButton()}

          {this.getPage()}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  const currUserId = state.config.id;

  let profileImage;
  let profileName;
  if (currUserId && state.users[currUserId] && state.users[currUserId].photo) {
    profileImage = state.users[currUserId].photo;
    profileName = state.users[currUserId].firstName;
  }

  return { profileImage, profileName };
};

export default connect(mapStateToProps, { logOut })(Index);

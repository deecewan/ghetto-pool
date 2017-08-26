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

    this.state = { travelling: false, passengers: [] };

    this.onLogout = this.onLogout.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onTravelClick = this.onTravelClick.bind(this);
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
        <Button content='Travel' icon='map outline' labelPosition='right' onClick={this.onTravelClick} />
      </div>
    );
  }

  onTravelClick() {
    this.setState({ travelling: !this.state.travelling })
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

  render() {
    return (
      <div>
        {this.getHeader()}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}>

          {this.getProfile()}
          {this.getTravelButton()}

          {this.state.travelling ? this.getTravellingList() : null}
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
    profileName = state.users[currUserId].firstName + " " + state.users[currUserId].lastName;
  }

  return { profileImage, profileName: state.users[currUserId].firstName };
};

export default connect(mapStateToProps, { logOut })(Index);

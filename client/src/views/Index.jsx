import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, List } from 'semantic-ui-react';
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

  getProfileImage() {
    if (!this.props.profileImage) {
      return null
    }

    return <img src={this.props.profileImage} />
  }

  getTravelButton() {
    return <Button onClick={this.onTravelClick}>Travel</Button>
  }

  onTravelClick() {
    this.setState({travelling: true})
  }

  getTravellingList() {
    return <Travel />;
    // const friendsList = ['Apples', 'Bananas']; // TODO: Replace with actual friends in range
    // return <List items={friendsList} />
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Header as="h1">Ghetto Pool </Header>
        {this.getProfileImage()}
        {this.getLogoutButton()}
        {this.getTravelButton()}
        {this.state.travelling ? this.getTravellingList() : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const currUserId = state.config.id;

  let profileImage;
  if (currUserId && state.users[currUserId] && state.users[currUserId].photo) {
    profileImage = state.users[currUserId].photo;
  }

  return { profileImage };
};

export default connect(mapStateToProps, { logOut })(Index);

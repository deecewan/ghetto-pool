import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, List, Image } from 'semantic-ui-react';
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

  getTravelButton() {
    return <Button content='Travel' icon='map outline' labelPosition='right' onClick={this.onTravelClick} />
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#212020',
      }}>
        <Image src='https://iwsmt-content-ok2nbdvvyp8jbrhdp.stackpathdns.com/July-27-2011-01-03-26-tumblr_ljoazy4Uk31qzpzfmo1_500.jpeg'/>
        <Header as="h1" color='grey'>Ghetto Pool</Header>
        {this.getTravelButton()}
        {this.getLogoutButton()}
        {this.state.travelling ? this.getTravellingList() : null}
      </div>
    )
  }
}

export default connect(() => ({}), { logOut })(Index)

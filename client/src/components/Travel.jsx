import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Dropdown, Loader } from 'semantic-ui-react';
import axios from 'axios';
import { addUserById } from '../store/users/actions'

const timeOptions = [{ text: '15 minutes', value: 15 }, { text: '30 minutes', value: 30 }, { text: '1 hour', value: 60 }]

export class Travel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: '',
      time: 0, // in minutes
      transport: 'car',
      loading: false,
      tripId: null,
      inviteableFacebookIds: [],
    };

    this.updateDestination = this.updateDestination.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateTransport = this.updateTransport.bind(this);
    this.submitNewTrip = this.submitNewTrip.bind(this);
  }

  updateDestination(e) {
    this.setState({ destination: e.target.value });
  }

  updateTime(e, data) {
    this.setState({ time: data.value });
  }

  updateTransport(value) {
    this.setState({ transport: value });
  }

  submitNewTrip() {
    this.setState({ loading: true })

    axios.post('/trips', {
      data: {
        destination: this.state.destination,
        depart_at: Date.now() / 1000 + this.state.time * 60,
      },
    }).then(({ data: { trip_id, inviteable_facebook_ids } }) => {
      this.setState({ loading: false, tripId: trip_id, inviteableFacebookIds: inviteable_facebook_ids })
      inviteable_facebook_ids.map(this.props.addUserById)
    })
  }

  getSubmitButton() {
    if (!this.state.destination || !this.state.time) {
      return null;
    }

    return <Button style={this.getStyleThingo()} onClick={this.submitNewTrip}>Submit</Button>;
  }

  renderTransportButton(transportType, icon) {
    return (
      <Button
        color={this.state.transport === transportType ? 'grey' : null}
        icon={icon}
        onClick={() => this.updateTransport(transportType)}
      />
    )
  }

  renderLoadingState() {
    return (
      <div>
        <Loader active inline size="large">Loading...</Loader>
      </div>
    )
  }

  getStyleThingo() {
    return { marginTop: 3, marginBottom: 3 };
  }

  renderFriendSelection() {
    return <div>WHO ARE YOUR FRIENDS???</div>
  }

  renderNewTrip() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          icon='location arrow'
          iconPosition='left'
          placeholder='Destination'
          value={this.state.destination}
          onChange={this.updateDestination}
          style={this.getStyleThingo()}
        />
        <Dropdown style={this.getStyleThingo()} placeholder='When are you leaving?' fluid selection options={timeOptions} onChange={this.updateTime} />
        <Button.Group style={this.getStyleThingo()} >
          {this.renderTransportButton('car', 'car')}
          {this.renderTransportButton('bus', 'bus')}
          {this.renderTransportButton('plane', 'military')}
          {this.renderTransportButton('ship', 'ship')}
          {this.renderTransportButton('walk', 'blind')}
        </Button.Group>
        {this.getSubmitButton()}
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingState();
    } else if (this.state.tripId) {
      return this.renderFriendSelection();
    } else {
      return this.renderNewTrip();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};

export default connect(mapStateToProps, { addUserById })(Travel);

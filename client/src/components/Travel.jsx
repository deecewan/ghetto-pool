import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Dropdown, Loader } from 'semantic-ui-react';
import axios from 'axios';
import { values, map } from 'lodash';
import { pickBy, keys, compose } from 'lodash/fp';
import { getTrips } from '../store/trips/actions';
import FriendList from '../components/FriendList';
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
      selectedFriends: [],
    };

    this.updateDestination = this.updateDestination.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateTransport = this.updateTransport.bind(this);
    this.submitNewTrip = this.submitNewTrip.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
    this.submitInvites = this.submitInvites.bind(this);
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
        transport_method: this.state.transport,
      },
    }).then(({ data: { trip_id, inviteable_facebook_ids } }) => {
      const ps = inviteable_facebook_ids.map(this.props.addUserById)

      Promise.all(ps)
        .then(() => this.setState({
          loading: false,
          tripId: trip_id,
          inviteableFacebookIds: inviteable_facebook_ids.map(id => ({ [id]: false })).reduce((acc, curr) => ({ ...acc, ...curr}), {}),
        }))
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

  onFriendClick(id) {
    this.setState({
      inviteableFacebookIds: {
        ...this.state.inviteableFacebookIds,
        [id]: !this.state.inviteableFacebookIds[id]
      }
    });
  }

  renderFriendSelection() {
    const invitable = map(this.state.inviteableFacebookIds, (invited, id) => ({
      id,
      invited,
      ...this.props.users[id],
    }))

    return <FriendList friends={invitable} onFriendClick={this.onFriendClick} />
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

  submitInvites() {
    this.setState({ loading: true });
    const invites = compose(keys, pickBy(v => v))(this.state.inviteableFacebookIds)
    axios.put(`/trips/${this.state.tripId}/invite`, {
      data: {
        invited_facebook_ids: invites,
      }
    })
      .then(() => this.setState({ loading: false, tripId: null, inviteableFacebookIds: [] }))
      .then(() => this.props.getTrips())
      .then(() => this.props.onTripSubmit())
  }

  getInviteButton() {
    if (values(this.state.inviteableFacebookIds).length === 0) {
      return <Button>Submit Trip</Button>
    }

    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        left: 0,
        backgroundColor: 'white',
        padding: 5
      }}>
        <Button
          style={{ marginBottom: 10, width: '90%', marginLeft: '5%' }}
          color="green"
          onClick={this.submitInvites}
        >
          Invite {values(this.state.inviteableFacebookIds).filter(x => x).length} Friends.
        </Button>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingState();
    } else if (this.state.tripId) {
      return (
        <div>
          {this.renderFriendSelection()}
          {this.getInviteButton()}
        </div>
      )
    } else {
      return this.renderNewTrip();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
};

export default connect(mapStateToProps, { addUserById, getTrips })(Travel);

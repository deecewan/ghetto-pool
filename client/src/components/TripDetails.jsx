import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Comment, Header, Modal, Image, Icon, Loader } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import { map, filter } from 'lodash';
import axios from 'axios';
import { addUserById } from '../store/users/actions';
import TripMap from './TripMap';

const transportToIcon = {
  car: 'car',
  walk: 'blind',
  ship: 'ship',
  plane: 'military',
  bus: 'bus',
}

export class TripDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyAccepted: false,
      accepted: props.accepted,
      accepting: false,
      loadInvitingUser: typeof props.invitedBy === 'string',
      mapOpen: false,
    };

    this.onAcceptTrip = this.onAcceptTrip.bind(this);
  }

  renderPassengerInformation() {
    if (!this.props.open) {
      return null
    }

    const passengerLength = Object.keys(this.props.passengers).length
    if (passengerLength < 1) {
      return null
    }

    return (
      <Card.Content extra>
        <div style={{ margin: "0 -1rem -0.75rem" }}>
          {this.props.passengers.map((p, i) => this.renderPassengerCard(p, i === passengerLength - 1))}
        </div>
      </Card.Content>
    )
  }

  componentDidMount() {
    if (this.state.loadInvitingUser) {
      // load the person
      this.props.addUserById(this.props.invitedBy)
        .then(() => this.setState({ loadInvitingUser: false }))
    }
  }

  renderPassengerIcon(passenger) {
    if (passenger.accepted) {
      return <Icon name="check" color="green" />;
    }

    if (this.props.inPast) {
      return <Icon name="remove" color="red" />;
    }

    return null;
  }

  renderPassengerCard(passenger, bottomRadius) {
    const backgroundColor = passenger.accepted
      ? "#e8f8ec"
      : this.props.inPast
        ? "#fbe9e9"
        : "";

    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "3rem",
          padding: "0 2rem",
          backgroundColor,
          borderBottomRightRadius: bottomRadius ? "4px" : null,
          borderBottomLeftRadius: bottomRadius ? "4px" : null,
        }}
        key={passenger.id}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingRight: "1rem",
        }}>
          <Image
            src={passenger.photo}
            shape="rounded"
            size="mini"
          />
        </div>
        <div style={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
        }}>
          {`${passenger.firstName} ${passenger.lastName}`}
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
        }}>
          {this.renderPassengerIcon(passenger)}
        </div>
      </div>
    )
  }

  onAcceptTrip(e) {
    e.stopPropagation();
    if (this.state.accepting) {
      return;
    }
    this.setState({ accepting: true });
    // do request here
    axios.post(`/trips/${this.props.id}/accept`)
      .then(() => this.setState({ accepting: false, recentlyAccepted: true }))
      .then(() => setTimeout(() => this.setState({ recentlyAccepted: false, accepted: true }), 500))
  }

  getAcceptButton(canAccept) {
    if (!canAccept || this.state.accepted || this.props.inPast) {
      return null;
    }

    return (
      <Card.Meta>
        <div style={{ marginTop: 10 }}>
          <Button
            basic={!this.state.recentlyAccepted}
            color="green"
            onClick={this.onAcceptTrip}
            loading={this.state.accepting}
            style={{ width: '100%' }}
          >
            Accept
          </Button>
        </div>
      </Card.Meta>
    )
  }

  renderMap() {
    if (this.props.inPast) {
      return null;
    }

    return (
      <Modal trigger={<Button>Open Map</Button>} basic>
        <Modal.Content>
          <TripMap centerId={this.props.userId} fbUserIds={map(this.props.passengers, 'id').concat([this.props.userId, this.props.ownId])} />
        </Modal.Content>
      </Modal>
    )
  }

  getTripDetails() {
    if (this.state.loadInvitingUser) {
      return (
        <div style={{
          width: "100%",
          marginBottom: "1rem",
        }}>
          <Card fluid link style={{ padding: '1rem' }}>
            <Card.Content>
              <Loader active />
            </Card.Content>
          </Card>
        </div>
      );
    }
    const tripOwnerImage = this.props.invitedBy
      ? <Image floated='right' shape="rounded" size='mini' src={this.props.invitedBy.photo} />
      : null;

    const canAccept = this.props.type === 'journey';

    const tripOwnerName = this.props.type === 'journey'
      ? `${this.props.invitedBy.firstName}'s Trip`
      : 'Your Trip';

    const numPassengers = Object.keys(this.props.passengers).length;

    return (
      <div style={{
        width: "100%",
        marginBottom: "1rem",
      }}>
        <Card fluid link={numPassengers > 0}>
          <Card.Content>
            <div style={{
              marginLeft: "-35px",
            }}>
              {tripOwnerImage}
            </div>
            <Card.Header>
              {tripOwnerName}
              <Icon style={{ marginLeft: 5 }} name={transportToIcon[this.props.transportMethod]}/>
            </Card.Header>
            <Card.Meta>
              <span>{`${this.props.inPast ? 'Left for' : 'Leaving for'} ${this.props.destination}${this.props.inPast ? '' : ' in'}`}</span>
              <TimeAgo date={this.props.departAt} />
            </Card.Meta>
            <Card.Meta>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ marginRight: "0" }}>{filter(this.props.passengers, 'accepted').length}</strong> passengers out of <strong>{numPassengers}</strong> have accepted.
                </div>
                {(this.state.accepted || !canAccept) ? <div style={{ paddingRight: (this.props.open ? "1.25rem" : "0") }}><Icon name="check" color="green" /></div> : null }
                {this.renderMap()}
              </div>
            </Card.Meta>
            { this.getAcceptButton(canAccept) }
          </Card.Content>
          {this.renderPassengerInformation()}
        </Card>
      </div>
    )
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onClick={e => {
          e.target.value = this.props.id;
          this.props.onClick(e);
        }}
      >
        {this.getTripDetails()}
      </div>
    )
  }
}

export default connect(() => ({}), { addUserById })(TripDetails);

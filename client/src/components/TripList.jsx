import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Header } from 'semantic-ui-react';
import map from 'lodash/map';
import TripDetails from './TripDetails';
import { filter, partition, isObject } from 'lodash';

export class TripList extends Component {
  constructor(props) {
    super(props);

    this.state = {openTripId: null}

    this.tripClick = e => {
      const trip = this.props.pastTrips.find(t => t.id === e.target.value) || this.props.futureTrips.find(t => t.id === e.target.value);
      if (trip && trip.passengers.length < 1) {
        return null;
      }

      if (this.state.openTripId === e.target.value) {
        this.setState({openTripId: null});
      } else {
        this.setState({openTripId: e.target.value});
      }
    }
  }

  renderTripCard(trip) {
    let tripProps;
    if (trip.invitedBy) {
      tripProps = {
        invitedBy: trip.invitedBy,
        accepted: trip.accepted,
        type: 'journey',
      };
    } else {
      tripProps = {
        type: 'trip',
      };
    }

    return (
      <TripDetails
        key={trip.id}
        id={trip.id}
        departAt={trip.departAt}
        passengers={trip.passengers}
        destination={trip.destination}
        transportMethod={trip.transportMethod}
        inPast={trip.inPast}
        open={trip.id === this.state.openTripId}
        onClick={this.tripClick}
        userId={trip.userId}
        {...tripProps}
      />
    );
  }

  renderPastTrips() {
    return (
      <div>
        <Header>Past Trips</Header>
        {this.props.pastTrips.map(t => this.renderTripCard(t))}
      </div>
    )
  }

  renderFutureTrips() {
    return (
      <div>
        <Header>Upcoming Trips</Header>
        {this.props.futureTrips.map(t => this.renderTripCard(t))}
      </div>
    )
  }

  renderTripDivider() {
    return (
      <div style={{
        width: "90%",
        margin: "0 auto 2rem",
      }}>
        <Divider />
      </div>
    );
  }

  render() {
    const containerStyle = {
      width: "80%",
      maxWidth: "40rem",
    };

    const hasPastTrips = this.props.pastTrips.length > 0;
    const hasFutureTrips = this.props.futureTrips.length > 0;

    if (!hasPastTrips && !hasFutureTrips) {
      return (
        <div style={containerStyle}>
          <div>You have no trips!</div>
        </div>
      );
    }

    return (
      <div style={containerStyle}>
        {hasFutureTrips && this.renderFutureTrips()}
        {hasPastTrips && hasFutureTrips && this.renderTripDivider()}
        {hasPastTrips && this.renderPastTrips()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const trips = map(state.trips, (trip, id) => ({ id, ...trip }));
  const journeys = map(state.journeys, (journey, id) => ({ id, ...journey }));
  const allTrips = trips.concat(journeys).sort((a, b) => b.departAt - a.departAt);

  const filteredTrips = allTrips.map(t => {
    const passengers = filter(t.passengers, p => p.id !== state.config.id)
      .map(p => ({ ...p, ...state.users[p.id] }))
      .sort((pa, pb) => pa.accepted ? -1 : 1);

    return {
      ...t,
      inPast: Date.now() > t.departAt,
      invitedBy: state.users[t.invitedBy] || t.invitedBy,
      userId: t.invitedBy || state.config.userId,
      passengers: passengers,
    }
  }
  );

  const [pastTrips, futureTrips] = partition(filteredTrips, 'inPast');

  return {
    pastTrips: pastTrips,
    futureTrips: futureTrips,
  };
};

export default connect(mapStateToProps)(TripList);

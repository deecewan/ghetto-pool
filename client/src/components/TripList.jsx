import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Header } from 'semantic-ui-react';
import compact from 'lodash/compact';
import map from 'lodash/map';
import TripDetails from './TripDetails';
import { filter, partition } from 'lodash/fp';

export class TripList extends Component {
  constructor(props) {
    super(props);

    this.state = {openTripId: null}

    this.tripClick = e => {
      if (this.state.openTripId === e.target.value) {
        this.setState({openTripId: null});
      } else {
        this.setState({openTripId: e.target.value});
      }
    }
  }

  renderTripCard(trip) {
    const passengers = compact(filter(trip.passengers, p => p.id !== this.props.ownId)
      .map(p => ({ ...p, ...this.props.users[p.id] })))
      .sort((pa, pb) => pa.accepted ^ pb.accepted);

    let tripProps;
    if (trip.invitedBy) {
      tripProps = {
        invitedBy: this.props.users[trip.invitedBy],
        accepted: trip.accepted,
        type: 'journey',
      };
    } else {
      tripProps = { type: 'trip' };
    }

    return (
      <TripDetails
        key={trip.id}
        id={trip.id}
        departAt={trip.departAt}
        passengers={passengers}
        destination={trip.destination}
        transportMethod={trip.transportMethod}
        inPast={trip.inPast}
        open={trip.id === this.state.openTripId}
        onClick={this.tripClick}
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
  const [pastTrips, futureTrips] = partition('inPast', allTrips.map(t => {
    t.inPast = Date.now() > t.departAt
    return t
  }));

  return {
    pastTrips: pastTrips,
    futureTrips: futureTrips,
    users: state.users,
    ownId: state.config.id,
  };
};

export default connect(mapStateToProps)(TripList);

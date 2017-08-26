import React, { Component } from 'react';
import { connect } from 'react-redux';
import compact from 'lodash/compact';
import map from 'lodash/map';
import TripDetails from './TripDetails';

export class TripList extends Component {
  constructor(props) {
    super(props);

    this.state = {openTripId: null}
    this.tripClick = e => this.setState({openTripId: e.target.value});
  }

  renderTripCard(trip) {
    const passengers = compact(trip.passengers.map(p => ({ ...p, ...this.props.users[p.id] })))
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
        open={trip.id === this.state.openTripId}
        onClick={this.tripClick}
        {...tripProps}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.trips.map(t => this.renderTripCard(t))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const trips = map(state.trips, (trip, id) => ({ id, ...trip }));
  const journeys = map(state.journeys, (journey, id) => ({ id, ...journey }));
  const allTrips = trips.concat(journeys).sort((a, b) => b.departAt - a.departAt);

  return {
    trips: allTrips,
    users: state.users,
  };
};

export default connect(mapStateToProps)(TripList);

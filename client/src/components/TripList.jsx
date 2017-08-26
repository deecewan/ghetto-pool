import React, { Component } from 'react';
import { connect } from 'react-redux';
import compact from 'lodash/compact';

const TripCard = ({ passengers }) => <div>{passengers.map(p => p.firstName).join(", ")}</div>;

export class TripList extends Component {
  renderTripCard(trip) {
    const passengers = compact(trip.passengers.map(p => this.props.users[p.id]));

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
      <TripCard
        key={trip.id}
        id={trip.id}
        departAt={trip.departAt}
        passengers={passengers}
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
  const trips = Object.entries(state.trips).map(([id, trip]) => ({ id, ...trip }));
  const journeys = Object.entries(state.journeys).map(([id, journey]) => ({ id, ...journey }));
  const allTrips = trips.concat(journeys).sort((a, b) => b.departAt - a.departAt);

  return {
    trips: allTrips,
    users: state.users,
  };
};

export default connect(mapStateToProps)(TripList);

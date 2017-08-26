function marshallPassenger(passenger) {
  return {
    firstName: passenger.first_name,
    lastName: passenger.last_name,
    accepted: passenger.accepted,
    id: passenger.user_id,
  };
}

function addTrip(state, trip) {
  return {
    ...state,
    [trip.id]: {
      departAt: trip.depart_at,
      passengers: trip.passengers.map(marshallPassenger),
    }
  }
}

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case '@TRIPS/ADD':
      return addTrip(state, payload);
    default:
      return state;
  }
}

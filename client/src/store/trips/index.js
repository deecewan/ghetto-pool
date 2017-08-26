function marshallPassenger(passenger) {
  return {
    id: passenger.id,
    accepted: passenger.accepted,
  };
}

function addTrip(state, trip) {
  return {
    ...state,
    [trip.id]: {
      departAt: trip.depart_at * 1000,
      transportMethod: trip.transport_method,
      destination: trip.destination,
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

function marshallPassenger(passenger) {
  return {
    id: passenger.id,
    firstName: passenger.first_name,
    lastName: passenger.last_name,
    accepted: passenger.accepted,
  }
}

function addJourney(state, journey) {
  return {
    ...state,
    [journey.id]: {
      invitedBy: journey.user_id,
      destination: journey.destination,
      departAt: journey.depart_at * 1000,
      accepted: journey.accepted,
      transportMethod: journey.transport_method,
      passengers: journey.passengers.map(marshallPassenger),
    }
  }
}

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case '@JOURNEYS/ADD':
      return addJourney(state, payload);
    default:
      return state;
  }
}

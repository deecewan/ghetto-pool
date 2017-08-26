export function getTrips() {
  return (dispatch) => {
    axios.get('/trips')
      .then(({ data: { trips }}) => {
        trips.map(trip => dispatch(addTrip(trip)));
      })
  }
}

export function addTrip(trip) {
  return {
    type: '@TRIPS/ADD',
    payload: trip,
  };
}

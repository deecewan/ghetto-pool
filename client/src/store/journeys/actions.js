import axios from 'axios';

export function getJourneys() {
  return (dispatch, getState) => {
    axios.get('/trips')
      .then(res => {
        const state = getState();
        const me = state.config.id;
        res.data.trips.filter(trip => trip.user_id !== me).map(trip => dispatch(addJourney(trip)))
      });
  }
}

export function addJourney(journey) {
  return {
    type: '@JOURNEYS/ADD',
    payload: journey,
  }
}

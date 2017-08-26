import axios from 'axios';
import { addUserById, addUsers } from '../users/actions'

export function getJourneys() {
  return (dispatch, getState) => {
    axios.get('/trips/journeys')
      .then(res => {
        const state = getState();
        const me = state.config.id;
        const trips = Object.keys(state.trips);
        res.data.trips
          .filter(trip => !trips.includes(trip.id.toString()))
          .filter(trip => trip.user_id !== me)
          .map((trip) => {
            dispatch(addUserById(trip.user_id));
            dispatch(addUsers(trip.passengers));
            return dispatch(addJourney(trip));
          });
      });
  };
}

export function addJourney(journey) {
  return {
    type: '@JOURNEYS/ADD',
    payload: journey,
  };
}

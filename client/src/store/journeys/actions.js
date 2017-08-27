import axios from 'axios';
import { addUserById, addUsers } from '../users/actions'
import { compose, filter, map, flatten, uniq, uniqBy} from 'lodash/fp'

export function getJourneys() {
  return (dispatch, getState) => {
    axios.get('/trips/journeys')
      .then(res => {
        const state = getState();
        const me = state.config.id;
        const trips = Object.keys(state.trips);
        const newTrips = res.data.trips
          .filter(trip => !trips.includes(trip.id.toString()))
          .filter(trip => trip.user_id !== me);

        const passengers = compose(uniqBy('id'), flatten, map('passengers'))(newTrips);
        const passengerIds = map('id')(passengers);

        dispatch(addUsers(passengers));
        compose(map(uId => dispatch(addUserById(uId))), filter(uId => !passengerIds.includes(uId)), uniq, map('user_id'))(newTrips);
        newTrips.map(trip => dispatch(addJourney(trip)));
      });
  };
}

export function addJourney(journey) {
  return {
    type: '@JOURNEYS/ADD',
    payload: journey,
  };
}

import axios from 'axios';
import { addUsers } from '../users/actions';

export function getTrips() {
  return (dispatch, getState) => {
    return axios.get('/trips')
      .then(({ data: { trips }}) => {
        const existing = Object.keys(getState().trips);
        trips
        .filter(trip => !existing.includes(trip.id.toString()))
          .map((trip) => {
            dispatch(addUsers(trip.passengers));
            return dispatch(addTrip(trip));
          });
      });
  };
}

export function addTrip(trip) {
  return {
    type: '@TRIPS/ADD',
    payload: trip,
  };
}

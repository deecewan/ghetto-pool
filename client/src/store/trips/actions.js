import axios from 'axios';
import { addUsers } from '../users/actions';

export function getTrips() {
  return (dispatch) => {
    return axios.get('/trips')
      .then(({ data: { trips }}) => {
        trips
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

import axios from 'axios';
import store from '../store';
import { getJourneys } from '../store/journeys/actions';
import { getTrips } from '../store/trips/actions';

class Background {

  postLocation() {
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      axios.post('/locations/current', {
        data: {
          lat: coords.latitude,
          lng: coords.longitude,
        }
      })
    });
  }

  doThings() {
    this.postLocation();
    store.dispatch(getJourneys());
    store.dispatch(getTrips());
  }

  start() {
    this.doThings();
    this.interval = setInterval(() => this.doThings(), 10000);
  }

  stop() {
    clearInterval(this.interval);
  }
}

export default new Background();

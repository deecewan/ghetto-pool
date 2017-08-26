import axios from 'axios';
import store from '../store';
import { getJourneys } from '../store/journeys/actions';

class Background {

  postLocation() {
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
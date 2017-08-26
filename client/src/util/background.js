import axios from 'axios';

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
  }

  start() {
    this.doThings();
    this.interval = setInterval(() => this.doThings(), 60000);
  }

  stop() {
    clearInterval(this.interval);
  }
}

export default new Background();

import logger from './logger';
const SERVICE_WORKER_FILENAME = './sw.js';

if ('serviceWorker' in window.navigator) {
  window.addEventListener('load', function() {
    window.navigator.serviceWorker.register('/sw.js').then((registration) => {
      // Registration was successful
      Notification && Notification.requestPermission(res => logger(`Notification Permission: ${res}.`));
    });
  });
}

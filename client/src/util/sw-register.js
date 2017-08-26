const SERVICE_WORKER_FILENAME = './sw.js';

if ('serviceWorker' in window.navigator) {
  window.addEventListener('load', function() {
    window.navigator.serviceWorker.register('/sw.js');
  });
}

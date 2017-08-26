export default function notify(title, body) {
  Notification.requestPermission((res) => {
    if (res === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, {
          body: body,
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 200, 100, 200],
        });
      });
    }
  })
}


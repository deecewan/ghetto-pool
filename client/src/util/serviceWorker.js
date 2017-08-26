self.addEventListener('install', function(event) {
  // Perform install steps
  console.log('service worker installed');
});

self.addEventListener('activate', (e) => {
  console.log('service worker activated', e);
})

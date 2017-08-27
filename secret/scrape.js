const axios = require('axios');


const properties = [];
let starts = [];
let lockStarts = false;

function removeFromStarts(num) {
  return new Promise((resolve) => {
    if (lockStarts) {
      // try again on the next tick to remove from the starts
      return setTimeout(() => resolve(removeFromStarts(num)), 0);
    }
    lockStarts = true;
    starts = starts.filter(s => s !== num);
    lockStarts = false;
    resolve();
  });
}

const mapsUrl = ({ latitude, longitude }) => `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=20&size=400x400&maptype=satellite&key=AIzaSyBqPdx_xX3jLl1KzAp2JqFZDps77sEhhxw`

function formatAddress(address) {
  return Object.assign({}, address, {
    image: mapsUrl(address.location),
  });
}

function getProperties(url, num = 1, response) {
  starts.push(num);
  return axios.get(url(num))
    .then(res => res.data)
    .then(data => {
      if (data._links.next && data._links.next.href) {
        getProperties(url, num + 1, response);
      }
      const addresses = data.tieredResults
        .map(tier => tier.results)
        .reduce((acc, curr) => acc.concat(curr), [])
        .map(property => property.address)
        .filter(address => !!address.location)
        .forEach((address, i) => properties.push(formatAddress(address)));

      removeFromStarts(num)
        .then(() => {
          if (starts.length === 0) {
            response.end(JSON.stringify(properties));
          }
        })
    })
    .catch(e => console.error(e));
}

function testScrape() {
  const testPostcodes = [4067, 4068, 4069, 4070];
  const u = urlMaker(testPostcodes)

  let endCount = 0

  const fakeRes = {
    send: (...args) => {
      console.log('send', ...args);
    },
    end: () => {
      console.log('ending');
      endCount++;
      if (endCount > 1)
        throw new Error('end called again')
    }
  };

  getProperties(u, undefined, fakeRes);
}

module.exports = getProperties;

const http = require('http');
const url = require('url');
const qs = require('querystring');
const scrape = require('./scrape');

const make = postcodes => postcodes.map(p => ({ postcode: p.toString() })).map(p => JSON.stringify(p)).join(',')

const urlMaker = postcodes => num => `https://services.realestate.com.au/services/listings/search?query={"channel":"rent","localities":[${make(postcodes)}],"pageSize":"10","page":"${num}","filters":{"propertyTypes":["house"],"surroundingSuburbs":true,"availableDateRange":{"maximum":"2017-08-27"},"keywords":{"terms":["pool"]}}}`

const server = http.createServer((req, res) => {
  const parsed = qs.parse(url.parse(req.url).query);
  if (!parsed.postcodes) {
    return res.end("Invalid Query");
  }
  res.setHeader('Content-Type', 'application/json');
  const postcodes = parsed.postcodes.split(',')
  const urlFn = urlMaker(postcodes);
  scrape(urlFn, 1, res);
});


server.listen(3001);

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');
const scrape = require('./scrape');

const make = postcodes => postcodes.map(p => ({ postcode: p.toString() })).map(p => JSON.stringify(p)).join(',')

const urlMaker = postcodes => num => `https://services.realestate.com.au/services/listings/search?query={"channel":"rent","localities":[${make(postcodes)}],"pageSize":"10","page":"${num}","filters":{"propertyTypes":["house"],"surroundingSuburbs":true,"availableDateRange":{"maximum":"2017-08-27"},"keywords":{"terms":["pool"]}}}`

const server = http.createServer((req, res) => {
  const parsed = qs.parse(url.parse(req.url).query);
  if (!parsed.postcodes) {
    const url = req.url;
    const fileName = (url === '/') ? 'index.html' : url;
    console.log(url, fileName);
    return fs.readFile(path.join(__dirname, fileName), (err, file) => {
      if (err) {
        res.end('404');
        return console.error(err);
      }

      return res.end(file);
    })
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  const postcodes = parsed.postcodes.split(',')
  const urlFn = urlMaker(postcodes);
  scrape(urlFn, 1, res);
});


server.listen(3001);

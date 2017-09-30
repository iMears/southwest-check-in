const Scraper = require('./scraper');
const passenger = require('./passenger');

scraper = new Scraper(passenger);
scraper.run();

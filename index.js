const Scraper = require('./scraper');
const passenger = require('./passenger');
const selectors = require('./selectors');
const moment = require('moment');

const scraper = new Scraper({ passenger, selectors });
const departureTime = moment('2017-11-06T14:40:01');
const checkInTime = departureTime.subtract(1, 'days').valueOf(); // Check in 24 hours before flight.
const currentTime = moment().valueOf();
const interval = 1000;
let duration = moment.duration(checkInTime - currentTime, 'milliseconds');

const countDown = setInterval(() => {
  if (duration <= 0) {
    console.log('Time done! Checking in now...');
    scraper.run();
    clearInterval(countDown);
    return;
  }

  duration = moment.duration(duration - interval, 'milliseconds');
  console.log(`${duration.days()}D  ${duration.hours()}H  ${duration.minutes()}M  ${duration.seconds()}S`);
}, interval);

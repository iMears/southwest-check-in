const puppeteer = require('puppeteer');
const passenger = require('./passenger');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const { confirmationNumber, firstName, lastName } = passenger;

  // Visit Southwest check in page
  await page.goto('https://www.southwest.com/air/check-in');

  // Fill in confirmation number
  await page.click('#confirmationNumber');
  await page.type(confirmationNumber);

  // Fill in first name
  await page.click('#passengerFirstName');
  await page.type(firstName);

  // Fill in last name
  await page.click('#passengerLastName');
  await page.type(lastName);

  // Click submit
  await page.click('#form-mixin--submit-button');

  // Wait for page to load
  await page.waitForSelector('.message_error');

  // Take screenshot
  await page.screenshot({ path: 'southwest-check-in.png', fullPage: true });

  await browser.close();
})();

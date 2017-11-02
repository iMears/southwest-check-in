
const puppeteer = require('puppeteer');

class Scraper {
  constructor(passenger) {
    this.passenger = passenger;
  }

  async run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const { confirmationNumber, firstName, lastName, phoneNumber } = this.passenger;

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
    await page.waitForSelector('.air-check-in-review-results--confirmation');

    // Click 'Check In'
    await page.click('.air-check-in-review-results--check-in-button');

    // Click 'Text' to have boarding pass sent via text
    await page.click('.boarding-pass-options--button-text');

    // Enter phone number
    await page.click('#textBoardingPass');
    await page.type(phoneNumber);

    // Click 'Send' to send boarding pass test
    await page.click('#form-mixin--submit-button');

    // Take screenshot
    await page.screenshot({ path: 'southwest-check-in.png', fullPage: true });

    await browser.close();
  }
}

module.exports = Scraper;

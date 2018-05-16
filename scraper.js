const puppeteer = require('puppeteer');

class Scraper {
  constructor(props) {
    this.passenger = props.passenger;
    this.selectors = props.selectors;
  }

  async run() {
    const {
      confirmationNumber,
      firstName,
      lastName,
      phone,
      email,
    } = this.passenger;

    const {
      confirmationNumberSelector,
      firstNameSelector,
      lastNameSelector,
      submitButtonSelector,
      confirmationSelector,
      checkInButtonSelector,
      textModalButtonSelector,
      textInputFieldSelector,
      textSubmitButtonSelector,
    } = this.selectors;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Visit Southwest check in page.
    await page.goto('https://www.southwest.com/air/check-in');

    // Fill in confirmation number.
    await page.click(confirmationNumberSelector);
    await page.type(confirmationNumber);

    // Fill in first name.
    await page.click(firstNameSelector);
    await page.type(firstName);

    // Fill in last name.
    await page.click(lastNameSelector);
    await page.type(lastName);

    // Click submit.
    await page.click(submitButtonSelector);

    // Wait for page to load.
    await page.waitForSelector(confirmationSelector);

    // Click 'Check In'.
    await page.click(checkInButtonSelector);
    console.log(`You\'re checked in!`);

    // Print boarding position information.
    const boardingPosition = await page.evaluate(() => document.querySelector('.air-check-in-passenger-item--information-boarding-position span').textContent);
    console.log(boardingPosition);

    if (this.passenger.phone.length) {
      // Click 'Text' to have boarding pass sent via SMS.
      await page.click(textModalButtonSelector);

      // Enter phone number
      await page.click(textInputFieldSelector);
      await page.type(phone);

      // Click 'Send' to send boarding pass SMS.
      await page.click(textSubmitButtonSelector);

      // Print boarding pass confirmation status.
      console.log(`Your boarding pass has been sent to ${phone}`)
    } else if (this.passenger.email.length) {

      // Click 'Email' to have boarding pass sent via email.
      await page.click('.boarding-pass-options--button-email');

      // Enter email address
      await page.click('#emailBoardingPass');
      await page.type(email);

      // Click 'Send' to send boarding pass email.
      await page.click('#form-mixin--submit-button');

      // Print boarding pass confirmation status.
      console.log(`Your boarding pass has been sent to ${email}`)
    }

    // await page.screenshot({ path: 'southwest-check-in.png', fullPage: true });

    await browser.close();
  }
}

module.exports = Scraper;

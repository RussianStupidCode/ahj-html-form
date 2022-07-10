import puppeteer from 'puppeteer';

jest.setTimeout(20000);

describe('card form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8888';
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('correct add item', async () => {
    await page.goto(baseUrl);
    const crmStartButton = await page.$('.crm-start-button');
    await crmStartButton.click();

    await page.waitForSelector('.crm');

    const addButton = await page.$('.btn.control.create');
    await addButton.click();

    const crudForm = await page.$('.crud-form');
    const titleInput = await crudForm.$('input[name="title"]');
    const priceInput = await crudForm.$('input[name="price"]');

    const submitButton = await crudForm.$('.btn.bg-success');

    await titleInput.type('phone');
    await priceInput.type('10 000');

    await submitButton.click();

    await page.waitForSelector('.crud-form.d-none');
  });
});


const puppeteer = require('puppeteer');

async function autoPostActivity(data) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://mg.umita.tw/login');
  await page.type('input[name="account"]', '果多');
  await page.type('input[name="password"]', '000');
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]')
  ]);

  await page.goto('https://mg.umita.tw/event/form');

  await page.type('input[name="title"]', data.title || '未命名活動');
  await page.type('textarea[name="description"]', data.description || '無活動內容');
  // ...更多欄位可依需求擴充

  await browser.close();
}

module.exports = autoPostActivity;


const { chromium } = require('playwright');

async function autoPostActivity(data) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://mg.umita.tw/login');

    await page.fill('input[name="account"]', 'your-account');
    await page.fill('input[name="password"]', 'your-password');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/admin/home');
    await page.goto('https://mg.umita.tw/admin/activities');
    await page.click('button:has-text("新增活動")');

    await page.fill('input[name="title"]', data.title);
    await page.fill('input[name="start_date"]', data.startDate);
    await page.fill('input[name="start_time"]', data.startTime);
    await page.fill('input[name="end_date"]', data.endDate);
    await page.fill('input[name="end_time"]', data.endTime);
    await page.fill('input[name="max_people"]', data.maxPeople);
    await page.fill('input[name="min_people"]', data.minPeople);
    await page.fill('input[name="contact"]', data.phone);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="website"]', data.website);
    await page.fill('input[name="organizer"]', data.organizer);
    await page.fill('input[name="host"]', data.host);
    await page.fill('input[name="location"]', data.address);
    await page.fill('textarea[name="content"]', data.content);
    await page.selectOption('select[name="category"]', { label: data.category });
    await page.selectOption('select[name="city"]', { label: data.city });
    await page.fill('input[name="fee"]', data.fee);
    await page.fill('input[name="payment"]', data.payment);

    if (data.publish) {
      await page.check('input[name="publish"]');
    }

    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.error('Automation error:', e);
  } finally {
    await browser.close();
  }
}

module.exports = { autoPostActivity };

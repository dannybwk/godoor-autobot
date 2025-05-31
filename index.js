
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const autoPostActivity = require('./puppeteer');

app.use(bodyParser.json());

app.post('/api/submit', async (req, res) => {
  try {
    await autoPostActivity(req.body);
    res.send('活動已成功送出');
  } catch (e) {
    console.error(e);
    res.status(500).send('處理失敗');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

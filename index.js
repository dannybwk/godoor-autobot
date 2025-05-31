
const express = require('express');
const bodyParser = require('body-parser');
const { autoPostActivity } = require('./playwright');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.post('/api/submit', async (req, res) => {
  const activity = req.body;
  try {
    console.log('Received activity:', activity);
    await autoPostActivity(activity);
    res.status(200).send({ message: 'Activity submitted successfully' });
  } catch (error) {
    console.error('Error submitting activity:', error);
    res.status(500).send({ message: 'Failed to submit activity' });
  }
});

app.get('/', (req, res) => {
  res.send('GoDoor Webhook is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

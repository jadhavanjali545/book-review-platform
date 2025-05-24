const express = require('express');
const app = express();
const PORT = 5000;

app.get('/test', (req, res) => {
  console.log('Received /test request');
  res.json([{ id: 1, title: 'Test Book', author: 'Test Author' }]);
});

app.listen(PORT, () => {
  console.log(`Test Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/countries', (req, res) => {
  res.json([
    { name: 'France', flag: '🇫🇷' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'South Korea', flag: '🇰🇷' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

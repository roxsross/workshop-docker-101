const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('BuildKit + Bake + Scout demo 🐳');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

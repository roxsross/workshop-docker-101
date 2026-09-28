const path = require('node:path');
const fs = require('node:fs');
const express = require('express');

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const indexHtml = fs
  .readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  .replace('${packageJson.version}', packageJson.version);

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.type('html').send(indexHtml);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor Node.js en ejecución en el puerto ${PORT}`);
  });
}

module.exports = app;

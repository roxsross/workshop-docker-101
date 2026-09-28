const os = require('os');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGE = process.env.APP_MESSAGE || 'Hola desde Docker Compose';

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.get('/', (_req, res) => {
  res.send(`<h1>${MESSAGE}</h1><p>Servido por el contenedor: ${os.hostname()}</p>`);
});

app.listen(PORT, () => console.log(`app escuchando en el puerto ${PORT}`));

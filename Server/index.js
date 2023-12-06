const { PORT } = require('./utils/config');
const express = require('express');
require('./db/mongo');
const cors = require('cors');

const mascotaRouter = require('./routes/mascotasRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const { handlerError, handlerNotFound } = require('./middlewares/handleRerrors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/mascota', mascotaRouter);
app.use('/api/usuario', usuarioRouter);

app.use(handlerNotFound);
app.use(handlerError);

app.listen(PORT, () => { console.log(`servidor escuchando en http://localhost:${PORT}`); });
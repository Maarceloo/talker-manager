const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getAllPeople, getPeopleID, emailValidation, passwordlValidation } = require('./services');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`);
});

// <---------------------------------------------------------------------->

app.get('/talker', async (_req, res) => {
  const result = await getAllPeople();
  if (!result) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getPeopleID(id);
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(result);
});

app.post('/login', emailValidation, passwordlValidation, async (req, res) => {
  const key = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: key });
});
const express = require('express');
const bodyParser = require('body-parser');
const { getAllPeople, getPeopleID } = require('./services');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
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
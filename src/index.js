const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {
  getAllPeople,
  getPeopleID,
  emailValidation,
  passwordlValidation,
  tokenValidation, 
  nameValidation, 
  ageValidation, 
  talkValidation, 
  watcheAtValidation,
  ratetValidation, 
  newUser,
  updateFiles,
  deleteFiles,
  getUserQuery,
} = require('./services');

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

app.get('/talker/search',
tokenValidation, async (req, res) => {
 const { q } = req.query;
 if (!q) {
  const result = await getAllPeople();
  return res.status(HTTP_OK_STATUS).json(result);
 }
 const usuario = await getUserQuery(q);
 res.status(200).json(usuario);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getPeopleID(id);
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(result);
});

app.post('/login', emailValidation, passwordlValidation, async (_req, res) => {
  const key = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: key });
});

app.post('/talker',
 tokenValidation,
 nameValidation,
 ageValidation,
 talkValidation,
 watcheAtValidation,
 ratetValidation, async (req, res) => {
   const file = await newUser(req);
  res.status(201).json(file);
 });

 app.put('/talker/:id',
 tokenValidation,
 nameValidation,
 ageValidation,
 talkValidation,
 watcheAtValidation,
 ratetValidation, async (req, res) => {
  const { id } = req.params;
  const file = await updateFiles(req, id);
  res.status(200).json(file);
 });

 app.delete('/talker/:id',
 tokenValidation, async (req, res) => {
  const { id } = req.params;
  const newFiles = await deleteFiles(id);
  res.status(204).json(newFiles);
 });

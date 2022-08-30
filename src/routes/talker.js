const express = require('express');
const ageValidation = require('../middleware/ageValidation');
const nameValidation = require('../middleware/nameValidation');
const ratetValidation = require('../middleware/ratetValidation');
const talkValidation = require('../middleware/talkValidation');
const tokenValidation = require('../middleware/tokenValidation');
const watcheAtValidation = require('../middleware/watcheAtValidation');
const { getAllPeople,
     getUserQuery, getPeopleID, newUser, updateFiles, deleteFiles } = require('../services');

const router = express.Router();

router.get('/', async (_req, res) => {
    const result = await getAllPeople();
    if (!result) {
      return res.status(200).json([]);
    }
    return res.status(200).json(result);
});
  
router.get('/search',
  tokenValidation, async (req, res) => {
   const { q } = req.query;
   if (!q) {
    const result = await getAllPeople();
    return res.status(200).json(result);
   }
   const usuario = await getUserQuery(q);
   res.status(200).json(usuario);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getPeopleID(id);
    if (!result) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(result);
});

router.post('/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watcheAtValidation,
  ratetValidation, async (req, res) => {
    const file = await newUser(req);
   res.status(201).json(file);
});
 
router.put('/:id',
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
 
router.delete('/:id',
  tokenValidation, async (req, res) => {
   const { id } = req.params;
   const newFiles = await deleteFiles(id);
   res.status(204).json(newFiles);
});
 
module.exports = router;
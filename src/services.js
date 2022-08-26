const fs = require('fs').promises;

const getAllPeople = async () => {
   const file = await fs.readFile('src/talker.json', 'utf8');
   const result = JSON.parse(file);
   return result;
};

const getPeopleID = async (id) => {
    const file = await fs.readFile('src/talker.json', 'utf8');
    const result = JSON.parse(file);
    const resposta = result.find((iten) => iten.id === Number(id));
    return resposta;
 };

 const emailValidation = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } if (!(emailRegex.test(email))) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const passwordlValidation = (req, res, next) => {
    const { password } = req.body;
    const KEY_PASSWORD = 6;
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } if (password.length < KEY_PASSWORD) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = { getAllPeople, getPeopleID, emailValidation, passwordlValidation };
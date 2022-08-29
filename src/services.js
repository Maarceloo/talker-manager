const fs = require('fs').promises;

const path = 'src/talker.json';

const getAllPeople = async () => {
   const file = await fs.readFile(path, 'utf8');
   const result = JSON.parse(file);
   return result;
};

const getPeopleID = async (id) => {
    const file = await fs.readFile(path, 'utf8');
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

const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    } if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    } if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const ageValidation = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    } if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
    };

const watcheAtValidation = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    } if (!dateRegex.test(watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const ratetValidation = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    } if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const newUser = async (req) => {
    const files = await getAllPeople();
    const userObj = {
        id: files.length + 1,
        name: req.body.name,
        age: req.body.age,
        talk: {
          watchedAt: req.body.talk.watchedAt,
          rate: req.body.talk.rate,
        },
    };
    try {
        files.push(userObj);
        await fs.writeFile(path, JSON.stringify(files));
        return userObj;
    } catch (error) {
        console.log(error);
        return null;
    }
}; 

const updateFiles = async (req, id) => {
    const userObj = {
        id: Number(id),
        name: req.body.name,
        age: req.body.age,
        talk: {
            watchedAt: req.body.talk.watchedAt,
            rate: req.body.talk.rate,
        },
    };
    const files = await getAllPeople();
    const newFiles = files.filter((iten) => iten.id !== Number(id));
    newFiles.push(userObj);
    try {
        await fs.writeFile(path, JSON.stringify(newFiles));
        return userObj;
    } catch (error) {
        return null;
    }
};

const deleteFiles = async (id) => {
    const files = await getAllPeople();
    const newFiles = files.filter((iten) => iten.id !== Number(id));
    try {
        await fs.writeFile(path, JSON.stringify(newFiles));
        return newFiles;
    } catch (error) {
        return null;
    }
};

module.exports = { 
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
    deleteFiles };
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

const getUserQuery = async (q) => {
    const files = await getAllPeople();
    const usuario = files.filter((iten) => iten.name.includes(q));
    return usuario;
};

module.exports = { 
    getAllPeople,
    getPeopleID,
    newUser,
    updateFiles,
    deleteFiles,
    getUserQuery };
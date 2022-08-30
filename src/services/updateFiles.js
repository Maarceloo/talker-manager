const fs = require('fs').promises;

const path = 'src/talker.json';
const getAllPeople = require('./getAllPeople');

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

module.exports = updateFiles;
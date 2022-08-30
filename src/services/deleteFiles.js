const fs = require('fs').promises;

const path = 'src/talker.json';
const getAllPeople = require('./getAllPeople');

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

module.exports = deleteFiles;
const fs = require('fs').promises;

const path = 'src/talker.json';
const getAllPeople = require('./getAllPeople');

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

module.exports = newUser;
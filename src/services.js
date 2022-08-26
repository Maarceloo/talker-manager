const fs = require('fs').promises;
// const talkerFile = require('./talker.json');

const getAllPeople = async () => {
   const content = await fs.readFile('src/talker.json', 'utf8');
   const result = JSON.parse(content);
   return result;
};

module.exports = { getAllPeople };
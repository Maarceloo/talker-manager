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
 
module.exports = { getAllPeople, getPeopleID };
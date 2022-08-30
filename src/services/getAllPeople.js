const fs = require('fs').promises;

const getAllPeople = async () => {
    const file = await fs.readFile('src/talker.json', 'utf8');
    const result = JSON.parse(file);
    return result;
 };

module.exports = getAllPeople;
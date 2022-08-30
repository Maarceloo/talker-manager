const getAllPeople = require('./getAllPeople');

const getUserQuery = async (q) => {
    const files = await getAllPeople();
    const usuario = files.filter((iten) => iten.name.includes(q));
    return usuario;
};

module.exports = getUserQuery;
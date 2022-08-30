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

module.exports = passwordlValidation;
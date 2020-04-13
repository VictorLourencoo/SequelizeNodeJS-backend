const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, email, data_nasc, password } = req.body;

    const pass_crypt = await bcrypt.hash(password, 7);

    const user = await User.create({ name, email, data_nasc, pass_crypt });

    return res.json(user);
  },
};

//console.log(senha);
//usando o cript para gerar a cifra
//const cipher = crypto.createCipher(algo, senha);
//criptografando os dados
//const password = cipher.update(text, 'utf8', type);
/*
    //descriptografia
    const dechiper = crypto.createDecipher(algo, senha);
    const pass = dechiper.update(password, type, 'utf8');


    console.log(pass);
    */

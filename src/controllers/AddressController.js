const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    //encontrar usuario pela chave primaria
    //procure o usuario que tem o id = user_id e faça um join
    //entre as tables users e adddresses
    const user = await User.findByPk(user_id, {
      include: { association: 'addresses' },
    });
    //users= todos os dados, user.addresses = so os endereços
    //o relacionamento tem que haver dos (dois lados), ou seja um users
    //tem varios endereços e cada pertence a um usuario
    return res.json(user.addresses);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;
    //encontrar usuario pela chave primaria
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      user_id,
    });

    return res.json(address);
  },
};
//um enderço e cadastrado de acordo com o usuario
//primeiro pega o id dele que vem nos parametros da rota

//verificar se esse user_id existe

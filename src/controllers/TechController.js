const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: 'techs',
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    return res.json(user.techs);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    //vai procurar uma tecnologia, caso nao encontre ele cria a tecnlogia
    //desestruturado. [tech, boolean]
    const [tech] = await Tech.findOrCreate({
      where: { name },
    });
    /*em um relacionamento N:N O sequelize
     cria meetods axiliares para ajudr no desenvolvimento */
    //adcionar o retorno do metodo findOrCreate a tabela tech
     await user.addTech(tech);

    return res.json(tech);
  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const tech = await Tech.findOne({
      where: { name },
    });

    await user.removeTech(tech);

    return res.json();
  },
};

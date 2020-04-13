const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        data_nasc: DataTypes.DATEONLY,
        pass_crypt: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    //hasMany = cada endereço pertence a um usuario obrigatoriamente.
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    //relacionamento muitos pra muitos
    this.belongsToMany(models.Tech, {
      foreignKey: 'user_id',
      //nome da tabela intermediaria que vai relacionar user, com tecnologias
      through: 'user_techs',
      as: 'techs',
    });
  }
}

module.exports = User;

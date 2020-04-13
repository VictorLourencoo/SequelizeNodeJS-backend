module.exports = {
  //configuração da base de dados

  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 've9967bl',
  database: 'Node_sequelize',
  define: {
    //timestamps = armazenar a data que o registro foi feito,
    // e ultima fez que o registro foi atualizdo
    timestamps: true,
    //nome e formato das tabelas e colunas no formato snake case(separados por _)
    underscored: true,
  },
};

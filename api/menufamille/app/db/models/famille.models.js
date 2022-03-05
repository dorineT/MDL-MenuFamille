module.exports = (sequelize, Sequelize) => {
    const Famille = sequelize.define("famille", {
      id_famille: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code_acces: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      nb_membres: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    });
    return Famille;
  };
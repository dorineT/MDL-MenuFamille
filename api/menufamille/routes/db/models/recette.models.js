module.exports = (sequelize, Sequelize) => {
    const Recette = sequelize.define("recette", {
      id_recette: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      difficulte: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      calorie: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      temps_cuisson: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      temps_preparation: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nb_personne: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nutriscore: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preparation: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    },
    {
      timestamps: false
    });
    return Recette;
  };
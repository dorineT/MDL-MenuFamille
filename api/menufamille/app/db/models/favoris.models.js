module.exports = (sequelize, Sequelize) => {
    const Favoris = sequelize.define("favoris", {
      id_recette: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_membre: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Favoris;
  };
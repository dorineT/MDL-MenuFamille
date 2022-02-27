module.exports = (sequelize, Sequelize) => {
    const Recette_denree = sequelize.define("recette_denree", {
      id_recette: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_denree: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      quantite: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
    },
    {
      timestamps: false
    });
    return Recette_denree;
  };
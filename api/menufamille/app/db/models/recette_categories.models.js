module.exports = (sequelize, Sequelize) => {
    const Recette_categories = sequelize.define("recette_categories", {
      id_recette: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_categorie: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Recette_categories;
  };
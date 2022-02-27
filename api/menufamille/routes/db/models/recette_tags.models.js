module.exports = (sequelize, Sequelize) => {
    const Recette_tags = sequelize.define("recette_tags", {
      id_recette: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_tag: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Recette_tags;
  };
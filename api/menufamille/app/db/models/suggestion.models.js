module.exports = (sequelize, Sequelize) => {
    const Suggestion = sequelize.define("suggestion", {
      id_periode: {
         type: Sequelize.INTEGER,
         primaryKey: true
      },
      id_recette: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_membre: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_menu: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Suggestion;
  };
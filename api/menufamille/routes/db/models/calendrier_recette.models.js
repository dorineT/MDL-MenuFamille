module.exports = (sequelize, Sequelize) => {
    const Calendrier_recette = sequelize.define("calendrier_recette", {
      id_calendrier: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_recette: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      periode: {
        type: Sequelize.ENUM('matin','midi','soir')
      }
    },
    {
      timestamps: false
    });
    return Calendrier_recette;
  };
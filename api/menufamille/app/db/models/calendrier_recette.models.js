module.exports = (sequelize, Sequelize) => {
    const Calendrier_recette = sequelize.define("calendrier_recette", {
      id_periode: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_calendrier: {
        type: Sequelize.INTEGER,
        allowNull: false  
      },
      id_recette: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      periode: {
        type: Sequelize.ENUM('matin','midi','soir')
      },
      isRecette:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defautValue: false
      }
    },
    {
      timestamps: false
    });
    return Calendrier_recette;
  };
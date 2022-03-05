module.exports = (sequelize, Sequelize) => {
    const Calendrier = sequelize.define("calendrier", {
      id_menu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      nb_personne: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: false
    });
    return Calendrier;
  };
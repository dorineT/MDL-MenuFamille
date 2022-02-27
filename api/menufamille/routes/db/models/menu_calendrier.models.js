module.exports = (sequelize, Sequelize) => {
    const Menu_calendrier = sequelize.define("menu_calendrier", {
      id_menu: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_calendrier: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Menu_calendrier;
  };
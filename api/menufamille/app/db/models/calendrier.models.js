module.exports = (sequelize, Sequelize) => {
    const Calendrier = sequelize.define("calendrier", {
      id_calendrier: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function() {
          return this.getDataValue('date').toLocaleString('fr-BE', {timeZone: 'UTC'}).slice(0,10);
        }
      }
    },
    {
      timestamps: false
    });
    return Calendrier;
  };
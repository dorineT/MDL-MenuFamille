module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
      id_menu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_famille: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      periode_debut: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function() {
          return this.getDataValue('periode_debut').toLocaleString('fr-BE', {timeZone: 'Europe/Brussels'}).slice(0,10);
        }
      },
      periode_fin: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function() {
          return this.getDataValue('periode_fin').toLocaleString('fr-BE', {timeZone: 'Europe/Brussels'}).slice(0,10);
        }
      },
      plat_identique_matin: {
          type: Sequelize.INTEGER,
          defaultValue: -1    
      },
      plat_identique_midi: {
        type: Sequelize.INTEGER,
        defaultValue: -1    
    },
    plat_identique_soir: {
      type: Sequelize.INTEGER,
      defaultValue: -1    
    },
    days_until_suggestion:{
      type: Sequelize.INTEGER,
      defaultValue: 2
    },
      type: {
          type: Sequelize.ENUM('manuel','auto','suggestion')
      },
      verrou:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {
      timestamps: false
    });
    return Menu;
  };
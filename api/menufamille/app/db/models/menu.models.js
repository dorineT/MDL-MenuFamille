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
        type: Sequelize.DATE,
        allowNull: false
      },
      periode_fin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      plat_identique: {
          type: Sequelize.INTEGER,
          defaultValue: -1    
      },
      type: {
          type: Sequelize.ENUM('manuel','auto','sugestion')
      }
    },
    {
      timestamps: false
    });
    return Menu;
  };
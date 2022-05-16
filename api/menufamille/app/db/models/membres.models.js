module.exports = (sequelize, Sequelize) => {
    const Membres = sequelize.define("membres", {
      id_membre: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true   
      },
      secret: {
          type: Sequelize.STRING,
          allowNull: false
      }
    },
    {
        timestamps: false
    });
    return Membres;
  };
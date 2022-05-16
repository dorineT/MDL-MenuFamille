module.exports = (sequelize, Sequelize) => {
    const Famille_membre = sequelize.define("famille_membre", {
      id_famille: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_membre: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      role: {
        type: Sequelize.ENUM('parent','enfant'),
        allowNull: false
      },
      statut: {
        type: Sequelize.ENUM('accepter','refuser','attente'),
        defaultValue: 'attente',
        allowNull: false
      }
    },
    {
      timestamps: false
    });
    return Famille_membre;
  };
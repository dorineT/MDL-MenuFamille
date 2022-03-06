module.exports = (sequelize, Sequelize) => {
    const Famille_membre = sequelize.define("famille_membre", {
      id_famille: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_membre: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Famille_membre;
  };
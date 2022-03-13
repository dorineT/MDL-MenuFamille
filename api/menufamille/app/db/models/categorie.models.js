module.exports = (sequelize, Sequelize) => {
    const Categorie = sequelize.define("categorie", {
      id_categorie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      periode: {
          type: Sequelize.ENUM('matin','midi','soir')
      }
    },
    {
      timestamps: false
    });
    return Categorie;
  };
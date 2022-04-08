module.exports = (sequelize, Sequelize) => {
    const Denree = sequelize.define("denree", {
      id_denree: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      nutriscore: {
        type: Sequelize.STRING,
        allowNull: true
      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: true

      },
    },
    {
        timestamps: false
    });
    return Denree;
  };
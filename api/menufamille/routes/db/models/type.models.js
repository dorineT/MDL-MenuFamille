module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("type", {
      id_type: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
        timestamps: false
    });
    return Type;
  };
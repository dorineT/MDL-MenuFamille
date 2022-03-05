module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
      id_tag: {
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
    return Tag;
  };
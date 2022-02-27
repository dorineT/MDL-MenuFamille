module.exports = (sequelize, Sequelize) => {
    const Denree_type = sequelize.define("denree_type", {
      id_denree: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_type: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Denree_type;
  };
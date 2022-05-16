module.exports = (sequelize, Sequelize) => {
    const Tag_periode = sequelize.define("tag_periode", {
      id_tag: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_periode: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false
    });
    return Tag_periode;
};
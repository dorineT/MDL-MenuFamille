module.exports = (sequelize, Sequelize) => {
    const Refresh_token = sequelize.define("refresh_token", {
      id_refreshToken: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_expiration: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_inscription: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      date_changement: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      timestamps: true,
      createdAt: 'date_inscription',
      updateAt:  'date_changement'
    });
    return Refresh_token;
  };
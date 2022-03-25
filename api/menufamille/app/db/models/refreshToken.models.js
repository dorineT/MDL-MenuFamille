const config = require("../../config/auth.config");
const { v4:uuidv4 } = require("uuid");




module.exports = (sequelize, Sequelize) => {
    const Refresh_token = sequelize.define("refresh_token", {
      id_refreshtoken: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_membre : {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date_expiration: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        get: function() {
          return this.getDataValue('date_expiration').toLocaleString('fr-BE', {timeZone: 'UTC'}).slice(0,10);
        }
      }
    },
    {
      timestamps: false
    });
    Refresh_token.createToken = async function (user) {
      let expiredAt = new Date();
      expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
      let _token = uuidv4();
      let refreshToken = await this.create({
        token: _token,
        id_membre: user.id_membre,
        date_expiration: expiredAt.getTime(),
      });
      return refreshToken.token;
    };
    Refresh_token.verifyExpiration = (token) => {
      return token.date_expiration < new Date().getTime();
    };
    return Refresh_token;
  };
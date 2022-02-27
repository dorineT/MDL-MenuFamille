const dbConfig = require("../db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    freezeTableName: true
  },
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.calendrier_recette = require("./calendrier_recette.models")(sequelize, Sequelize);
db.calendrier = require("./calendrier.models")(sequelize, Sequelize);
db.categorie = require("./categorie.models")(sequelize, Sequelize);
db.denree_type = require("./denree_type.models")(sequelize, Sequelize);
db.denree = require("./denree.models")(sequelize, Sequelize);
db.famille_membre = require("./famille_membre.models")(sequelize, Sequelize);
db.famille = require("./famille.models")(sequelize, Sequelize);
db.favoris = require("./favoris.models")(sequelize, Sequelize);
db.membres = require("./membres.models")(sequelize, Sequelize);
db.menu_calendrier = require("./menu_calendrier.models")(sequelize, Sequelize);
db.menu = require("./menu.models")(sequelize, Sequelize);
db.recette_categories = require("./recette_categories.models")(sequelize, Sequelize);
db.recette_denree = require("./recette_denree.models")(sequelize, Sequelize);
db.recette_tags = require("./recette_tags.models")(sequelize, Sequelize);
db.recette = require("./recette.models")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.models")(sequelize, Sequelize);
db.tag = require("./tag.models")(sequelize, Sequelize);
db.type = require("./type.models")(sequelize, Sequelize);




module.exports = db;
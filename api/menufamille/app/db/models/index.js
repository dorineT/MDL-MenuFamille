const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions:{
    useUTC:true
  },
  timezone: '+01:00',
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
db.tag_periode = require("./tag_periode.models")(sequelize, Sequelize);

// Menu -> Famille (O:M)
db.famille.hasMany(db.menu, {foreignKey: 'id_famille', onDelete: 'CASCADE'})
db.menu.belongsTo(db.famille, {foreignKey: 'id_famille', onDelete: 'CASCADE'})

// Membre -> RefreshToken (O:O)
db.refreshToken.belongsTo(db.membres, {foreignKey: 'id_membre',targetKey: 'id_membre',onDelete: 'RESTRICT'})
db.membres.hasOne(db.refreshToken, {foreignKey: 'id_membre',targetKey: 'id_membre', onDelete: 'RESTRICT'})

// Famille -> Membre (M:M)
db.famille.belongsToMany(
  db.membres, 
  { 
      through: db.famille_membre,
      foreignKey: 'id_famille',
      onDelete: 'CASCADE'
  }
)

db.membres.belongsToMany(
  db.famille, 
  {
      through: db.famille_membre,
      foreignKey: 'id_membre',
      onDelete: 'CASCADE'
  }
)

// Membre -> Recette (M:M)
db.membres.belongsToMany(
  db.recette, 
  { 
      through: db.favoris,
      foreignKey: 'id_membre',
      onDelete: 'CASCADE'
  }
)

db.recette.belongsToMany(
  db.membres, 
  {
      through: db.favoris,
      foreignKey: 'id_recette',
      onDelete: 'CASCADE'
  }
)

// Denree -> Type (M:M)
db.denree.belongsToMany(
  db.type, 
  { 
      through: db.denree_type,
      foreignKey: 'id_denree',
      onDelete: 'CASCADE'
  }
)

db.type.belongsToMany(
  db.denree, 
  {
      through: db.denree_type,
      foreignKey: 'id_type',
      onDelete: 'CASCADE'
  }
)

// Recette -> Denree (M:M)
db.recette.belongsToMany(
  db.denree, 
  { 
      through: db.recette_denree,
      foreignKey: 'id_recette',
      onDelete: 'CASCADE'
  }
)

db.denree.belongsToMany(
  db.recette, 
  {
      through: db.recette_denree,
      foreignKey: 'id_denree',
      onDelete: 'CASCADE'
  }
)

// Recette -> Tag (M:M)
db.recette.belongsToMany(
  db.tag, 
  { 
      through: db.recette_tags,
      foreignKey: 'id_recette',
      onDelete: 'CASCADE'
  }
)

db.tag.belongsToMany(
  db.recette, 
  {
      through: db.recette_tags,
      foreignKey: 'id_tag',
      onDelete: 'CASCADE'
  }
)

// Recette -> Categorie (M:M)
db.recette.belongsToMany(
  db.categorie, 
  { 
      through: db.recette_categories,
      foreignKey: 'id_recette',
      onDelete: 'CASCADE'
  }
)

db.categorie.belongsToMany(
  db.recette, 
  {
      through: db.recette_categories,
      foreignKey: 'id_categorie',
      onDelete: 'CASCADE'
  }
)

// Calendrier -> Recette (M:M)
db.calendrier.belongsToMany(
  db.recette, 
  { 
      through: db.calendrier_recette,
      foreignKey: 'id_calendrier',
      onDelete: 'CASCADE'
  }
)

db.calendrier.hasMany(db.calendrier_recette, {foreignKey: 'id_calendrier',targetKey: 'id_calendrier'})
db.calendrier_recette.belongsTo(db.calendrier,  {foreignKey: 'id_calendrier',targetKey: 'id_calendrier'})

db.recette.belongsToMany(
  db.calendrier, 
  {
      through: db.calendrier_recette,
      foreignKey: 'id_recette',
      onDelete: 'CASCADE'
  }
)

db.recette.hasMany(db.calendrier_recette,  {foreignKey: 'id_recette',targetKey: 'id_recette'})
db.calendrier_recette.belongsTo(db.recette, {foreignKey: 'id_recette',targetKey: 'id_recette'})

// Menu -> Calendrier (M:M)
db.menu.belongsToMany(
  db.calendrier, 
  { 
      through: db.menu_calendrier,
      foreignKey: 'id_menu',
      onDelete: 'CASCADE'
  }
)

db.calendrier.belongsToMany(
  db.menu, 
  {
      through: db.menu_calendrier,
      foreignKey: 'id_calendrier',
      onDelete: 'CASCADE'
  }
)

// Calendrier_recette -> tag (M:M)
db.calendrier_recette.belongsToMany(
  db.tag, 
  { 
      through: db.tag_periode,
      foreignKey: 'id_periode',
      onDelete: 'CASCADE'
  }
)

db.tag.belongsToMany(
  db.calendrier_recette, 
  {
      through: db.tag_periode,
      foreignKey: 'id_tag',
      onDelete: 'CASCADE'
  }
)
module.exports = db;
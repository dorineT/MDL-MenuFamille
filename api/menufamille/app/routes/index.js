// ./routes/index.js
// Table de base
const type = require('./type.js')
const user = require('./user.js')
const recette = require('./recette.js')
const menu = require('./menu.js')
const calendrier = require('./calendrier.js')
const categorie = require('./categorie.js')
const denree = require('./denree.js')
const famille = require('./famille.js')
const tag = require('./tag.js')
const membres = require('./membres.js')

// Tables de liens
const calendrier_recette = require('./calendrier_recette.js')
const denree_type = require('./denree_type.js')
const famille_membre = require('./famille_membre.js')
const favoris = require('./favoris.js')
const menu_calendrier = require('./menu_calendrier.js')
const recette_categories = require('./recette_categories.js')
const recette_denree = require('./recette_denree.js')
const recette_tags = require('./recette_tags.js')

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../../swagger.json');

module.exports = app => {
  app.use(
    '/info',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
  // Tables de base
  app.use('/type', type)
  app.use('/user', user)
  app.use('/recette', recette)
  app.use('/menu', menu)
  app.use('/calendrier', calendrier)
  app.use('/categorie', categorie)
  app.use('/denree', denree)
  app.use('/famille', famille)
  app.use('/tag', tag)
  app.use('/membres', membres)

  

  // Tables de liens
  app.use('/calendrier_recette', calendrier_recette)
  app.use('/denree_type', denree_type)
  app.use('/famille_membre', famille_membre)
  app.use('/favoris', favoris)
  app.use('/menu_calendrier', menu_calendrier)
  app.use('/recette_categories', recette_categories)
  app.use('/recette_denree', recette_denree)
  app.use('/recette_tags', recette_tags)

}
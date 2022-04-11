// ./routes/index.js
// Table de base
const type = require('./type.js')
const user = require('./user.js')

const recette = require('./recette.js');
const menu = require('./menu.js');
const calendrier = require('./calendrier.js');
const categorie = require('./categorie.js');
const denree = require('./denree.js');
const famille = require('./famille.js');
const tag = require('./tag.js');
const membres = require('./membres.js');
const calendrier_recette = require('./calendrier_recette.js');
const tag_periode = require('./tag_periode.js')
const suggestion = require('./suggestion.js')

const product = require('./product');
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
  app.use('/product', product)
  app.use('/calendrier_recette', calendrier_recette)
  app.use('/tag_periode',tag_periode)
  app.use('/suggestion',suggestion)
}
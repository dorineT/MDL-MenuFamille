// ./routes/index.js
const type = require('./type.js')
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');
module.exports = app => {
  app.use(
    '/info',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
  app.use('/type', type)
  // etc..
}
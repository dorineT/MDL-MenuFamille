// ./routes/index.js
const home = require('./home')
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');
module.exports = app => {
  app.use(
    '/',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
  app.use('/test', home)
  // etc..
}
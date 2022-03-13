const Router = require('express-promise-router')
const type = require("../db/controller/type.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router

router.use(function(req, res, next) { //toujours en premier
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

    // Retrieve all Types
router.get('/', type.findAll);

router.get('/:id', type.findById);

router.post('/', type.putType);

router.put('/:id', type.UpdateType);

router.delete('/:id', type.DeleteType);
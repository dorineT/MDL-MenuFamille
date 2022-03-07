const Router = require('express-promise-router')
const famille = require("../db/controller/famille.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Famille
router.get('/', famille.findAll);

router.post('/PutFamille', famille.PutFamilly);

router.update('/UpdateFamille/:id', famille.UpdateFamilly);

router.delete('/DeleteFamille/:id', famille.DeleteFamilly);
const Router = require('express-promise-router')
const categorie = require("../db/controller/categorie.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Types
router.get('/', categorie.findAll);

router.post('/PutCategorie', categorie.PutCategory);

router.update('/UpdateCategorie/:id', categorie.UpdateCategory);

router.delete('/DeleteCategorie/:id', categorie.DeleteCategory);
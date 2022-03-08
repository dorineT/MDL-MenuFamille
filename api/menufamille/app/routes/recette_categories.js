const Router = require('express-promise-router')
const recette_categories = require("../db/controller/recette_categories.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', recette_categories.findAll);

router.put('/PutRecetteCategorie', recette_categories.Put_Recipe_Category);

router.post('/UpdateRecetteCategorie/:id_recette/:id_categorie', recette_categories.Update_Recipe_Category);

router.delete('/DeleteRecetteCategorie/:id_recette/:id_categorie', recette_categories.Delete_Recipe_Category);
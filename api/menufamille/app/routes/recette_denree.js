const Router = require('express-promise-router')
const recette_denree = require("../db/controller/recette_denree.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', recette_denree.findAll);

router.put('/PutRecetteDenree', recette_denree.PutRecipe_Denree);

router.post('/UpdateRecetteDenree/:id_recette/:id_denree', recette_denree.UpdateRecipe_Denree);

router.delete('/DeleteRecetteDenree/:id_recette/:id_denree', recette_denree.Delete_Recipe_Denree);
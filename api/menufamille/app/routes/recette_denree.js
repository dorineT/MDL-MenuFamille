const Router = require('express-promise-router');
const recette_denree = require("../db/controller/recette_denree.controller.js");
const { authJwt } = require("../middleware");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router

// Retrieve all Recipes
router.get("/",recette_denree.findAll);

router.post('/', recette_denree.PutRecipe_Denree);

router.put('/:id', recette_denree.UpdateRecipe_Denree);

router.delete('/:id', recette_denree.Delete_Recipe_Denree);
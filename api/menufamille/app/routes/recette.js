const Router = require('express-promise-router')
const recette = require("../db/controller/recette.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router



// Retrieve all Recipes 
router.get("/", recette.findAll);

router.post('/PutRecipe', recette.PutRecipe);

router.update('/UpdateRecipe/:id', recette.UpdateRecipe);

router.delete('/DeleteRecipe/:id', recette.DeleteRecipe);

router.get('/FindWithTags', recette.find_All_Tags);

router.get('/FindRecipe/:id', recette.find_Recipe);

router.get('/FindFromTags', recette.find_Recipe_tags);
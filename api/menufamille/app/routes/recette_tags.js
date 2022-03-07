const Router = require('express-promise-router')
const recette_tags = require("../db/controller/recette_tags.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', recette_tags.findAll);

router.post('/PutRecetteTags', recette_tags.PutRecipe_tag);

router.update('/UpdateRecetteTags/:id_recette/:id_tags', recette_tags.Update_Recipe_tag);

router.delete('/DeleteRecetteTags/:id_recette/:id_tags', recette_tags.Delete_Recipe_Tag);
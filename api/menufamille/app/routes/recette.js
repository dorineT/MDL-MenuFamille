const Router = require('express-promise-router')
const recette = require("../db/controller/recette.controller.js");
const { authJwt } = require("../middleware")

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


router.get('/FindRecipe/:id',[authJwt.verifyToken], recette.find_Recipe);

router.get('/FindFromTags/:periode',[authJwt.verifyToken], recette.find_Recipe_tags);

// recettes et leurs tags
router.get('/AllTags', recette.find_Recipe_With_Tags);

// Creer recette avec denree, tags et catégorie
router.post('/CreateRecipeAllInfo',[authJwt.verifyToken], recette.Create_Recipe_All_Infos);

// Get all nutriscores and calories
router.get('/GetAllNutAndCal/:id_recette',[authJwt.verifyToken], recette.GetAllNutAndCal);

// Get recipe from it's categories
router.get('/GetFromCategory/:periode', recette.Get_From_Cat);

router.get("/price/:id",recette.get_price)

const Router = require('express-promise-router')
const suggestion = require("../db/controller/suggestion.controller.js");
const { authJwt } = require("../middleware")


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router

router.get('/', suggestion.findAll);

//creation d'un menu
router.post('/', suggestion.put_suggestion);

router.put('/:id_periode/:id_recette/:id_menu',[authJwt.verifyToken] ,suggestion.Update_suggestion);

router.delete('/:id_periode/:id_recette/:id_menu',[authJwt.verifyToken] ,suggestion.Delete_suggestion);
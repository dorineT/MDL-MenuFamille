const Router = require('express-promise-router')
const favoris = require("../db/controller/favoris.controller.js");
const auth = require("../db/controller/auth.controller");
const { authJwt } = require("../middleware")

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


router.get('/',[authJwt.verifyToken], favoris.findAll);
router.get('/:id_recette',[authJwt.verifyToken], favoris.find);

router.post('/',[authJwt.verifyToken], favoris.PutFavorite);


router.delete('/:id_recette',[authJwt.verifyToken], favoris.DeleteFavoris);
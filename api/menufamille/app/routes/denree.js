const Router = require('express-promise-router')
const denree = require("../db/controller/denree.controller.js");
const { authJwt } = require("../middleware");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


router.get('/Like/:nom', [authJwt.verifyToken], denree.FindWithLike);

router.get('/FindOrCreate/:nom', [authJwt.verifyToken],denree.FindOrCreate);//

router.get('/NutriAndCalo/:id_denree',[authJwt.verifyToken], denree.Get_Nut_and_Cal);

router.post('/and_type',[authJwt.verifyToken],denree.post_denree_and_type);
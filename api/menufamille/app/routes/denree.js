const Router = require('express-promise-router')
const denree = require("../db/controller/denree.controller.js");
const { authJwt } = require("../middleware");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Types
router.get('/', denree.findAll);

router.post('/', denree.PutDenree);

router.put('/:id', denree.UpdateDenree);

router.delete('/:id', denree.DeleteDenree);

router.get('/Like',[authJwt.verifyToken], denree.FindWithLike);

router.get('/FindOrCreate/:nom', denree.FindOrCreate);

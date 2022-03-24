const Router = require('express-promise-router')
const tag = require("../db/controller/tag.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', tag.findAll);

router.post('/', tag.PutTag);

router.post('/:id', tag.UpdateTag);

router.delete('/:id', tag.Deletetag);

router.get('/recette/:id',tag.TagRecette)
const Router = require('express-promise-router')
const type = require("../db/controller/type.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Types
router.get("/", type.findAll);
const Router = require('express-promise-router')
const tag = require("../db/controller/tag_periode.controller.js");

const router = new Router()
module.exports = router

router.get('/', tag.findAll);
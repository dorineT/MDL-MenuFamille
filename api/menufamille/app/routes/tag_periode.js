const Router = require('express-promise-router')
const tag_periode = require("../db/controller/tag_periode.controller.js");

const router = new Router()
module.exports = router

router.get('/', tag_periode.findAll);

router.post('/',tag_periode.PutTag_periode)
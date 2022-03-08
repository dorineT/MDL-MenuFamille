const Router = require('express-promise-router')
const membres = require("../db/controller/membres.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', membres.findAll);

router.put('/PutMembre', membres.PutMember);

router.post('/UpdateMembre/:id', membres.UpdateMember);

router.delete('/DeleteMembre/:id', membres.DeleteMember);
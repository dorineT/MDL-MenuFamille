const Router = require('express-promise-router')
const famille_membre = require("../db/controller/famille_membre.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', famille_membre.findAll);

router.post('/', famille_membre.PutFamillyMember);

router.put('/:id_famille/:id_membre', famille_membre.Update_Familly_Member);

router.delete('/:id_famille/:id_membre', famille_membre.DeleteFamillyMember);
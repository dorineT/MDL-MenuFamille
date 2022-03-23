const Router = require('express-promise-router')
const membres = require("../db/controller/membres.controller.js");
const { authJwt } = require("../middleware")

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', membres.findAll);

router.post('/', membres.PutMember);

router.put('/:id', membres.UpdateMember);

router.delete('/:id', membres.DeleteMember);

router.get("/GetListMembre/:id",[authJwt.verifyToken], membres.GetListMembre);

router.post("/:id_fam/:id_mem",[authJwt.verifyToken], membres.JoinFamilly);

router.delete("/:id_fam/:id_mem",[authJwt.verifyToken], membres.LeaveFamilly);
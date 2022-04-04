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


/// Dés que vous utilisez un des join où leave familly, afin de facilité la lisibilité des requètes, 
/// la fonction pour ajouter un membre au nbr de membre dans la table famille
/// --> 
/// famille/AjouterMembreNumber/:id 
/// famille/RetirerMembreNumber/:id
/// où id est l'id de la famille
router.delete("/:id_fam/:id_mem",[authJwt.verifyToken, authJwt.isParent], membres.LeaveFamilly);
const Router = require('express-promise-router')
const famille = require("../db/controller/famille.controller.js");

const auth = require("../db/controller/auth.controller");
const { authJwt } = require("../middleware")
const role = require("../db/controller/famille_membre.controller");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router

router.use(function(req, res, next) { //toujours en premier
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


// Retrieve all Famille
// note pour sean, comme les requetes sont différentes (post put get,... pas besoin de mettre des noms différents etant donne que ça fait la 
// difference avec le type de requete donc un / ou /:id est ok
router.get('/', famille.findAll);

router.post('/', famille.PutFamilly);

router.put('/:id', famille.UpdateFamilly);

router.delete('/:id_famille',[authJwt.verifyToken, authJwt.isMember , authJwt.isParent], famille.DeleteFamilly);

//doit etre ajoute sur toutes les requetes
router.get("/:id/parent", [authJwt.verifyToken, authJwt.isParent], role.parentBoard);

router.get("/GetListFamilly/:id",[authJwt.verifyToken], famille.GetListFamilly);

/// Dés que vous utilisez une fonction où un membre quitte ou rejoint une famille
/// afin de facilité la lisibilité des requètes, 
/// la fonction pour ajouter un membre au nbr de membre (nb_membres) dans la table famille
/// --> 
/// famille/AjouterMembreNumber/:id 
/// famille/RetirerMembreNumber/:id
/// où id est l'id de la famille

router.delete("/:id_famille/:id_membre",[authJwt.verifyToken, authJwt.isMember , authJwt.isParent], famille.DeleteMemberFamilly);

router.put('/switch/:id_famille/:id_membre',[authJwt.verifyToken, authJwt.isParent], famille.SwitchRole);

router.post('/createFamilly/:id_membre',[authJwt.verifyToken], famille.CreateFamilly);


router.get('/CheckAccesCode/:id_famille', famille.CheckAccesCode);

router.get("/GetListMembre/:id_famille",[authJwt.verifyToken], (req, res)=> {
  req.statut = "accepter";
  famille.GetListMembre(req,res)
});

router.get("/Request/:id_famille",[authJwt.verifyToken, authJwt.isMember, authJwt.isParent], (req, res)=> {
  req.statut = "attente";
  famille.GetListMembre(req,res)
});

router.get("/notif",[authJwt.verifyToken], famille.GetListNotif);

router.put("/request/:id_membre/:id_famille/accepted", [authJwt.verifyToken, authJwt.isMember, authJwt.isParent], (req,res) => {
  req.statut = "accepter"
  famille.Update_Statut_Request(req,res);
  }
);

router.put("/request/:id_membre/:id_famille/refused", [authJwt.verifyToken, authJwt.isMember, authJwt.isParent], (req,res) => {
  req.statut = "refuser"
  famille.Update_Statut_Request(req,res);
  }
);

router.post("/join",[authJwt.verifyToken, authJwt.VerifyCode], famille.joinFamilly);

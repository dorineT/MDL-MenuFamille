const Router = require('express-promise-router')
const menu = require("../db/controller/menu.controller.js");
const { authJwt } = require("../middleware");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});



//get menu complet
router.get('/GetAllInfo/:id',[authJwt.verifyToken], menu.Get_Menu_All_Info_PK);

//utilise pour la recup de menus verrouillés avec toute leur infos
router.get('/GetLockedMenu/:id_fam',[authJwt.verifyToken], menu.Get_Current_Locked_Menu); 

//menu non verrouilles
router.get('/GetUnlockedMenu/:id_fam',[authJwt.verifyToken], menu.Get_Unlocked_Menu);

//update info de base de menu
router.put('/:id',[authJwt.verifyToken, authJwt.isParent], menu.UpdateMenu);

//menu non verrouille en mode suggestion
router.get('/GetSuggestUnlockedMenu/:id_fam',[authJwt.verifyToken], menu.Get_Suggest_Unlocked_Menu); 

//crée un nv menu
router.post('/new_menu',[authJwt.verifyToken, authJwt.isParent],menu.create_New_Menu);

// récupère les anciens menus
router.get("/old/:id_fam",[authJwt.verifyToken],menu.old_menu);

// récupère les menus via id
router.get('/GetMenuId/:id',[authJwt.verifyToken], menu.Get_Menu_By_Id);


router.get('/food/:id_menu', menu.getFood);


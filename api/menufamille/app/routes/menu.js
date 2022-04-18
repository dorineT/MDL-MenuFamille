const Router = require('express-promise-router')
const menu = require("../db/controller/menu.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router




//get menu complet
router.get('/GetAllInfo/:id', menu.Get_Menu_All_Info_PK);

//utilise pour la recup de menus verrouillés avec toute leur infos
router.get('/GetLockedMenu/:id_fam', menu.Get_Current_Locked_Menu); 

//menu non verrouilles
router.get('/GetUnlockedMenu/:id_fam', menu.Get_Unlocked_Menu);

//update info de base de menu
router.put('/:id', menu.UpdateMenu);

//menu non verrouille en mode suggestion
router.get('/GetSuggestUnlockedMenu/:id_fam', menu.Get_Suggest_Unlocked_Menu); 

//crée un nv menu
router.post('/new_menu',menu.create_New_Menu);

// récupère les anciens menus
router.get("/old/:id_fam",menu.old_menu);

// récupère les menus via id
router.get('/GetMenuId/:id', menu.Get_Menu_By_Id);






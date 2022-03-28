const Router = require('express-promise-router')
const menu = require("../db/controller/menu.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', menu.findAll);

//creation d'un menu
router.post('/', menu.PutMenu);

router.put('/:id', menu.UpdateMenu);

router.delete('/:id', menu.DeleteMenu);

//utilise pour la recup de menus verrouillés avec toute leur infos
router.get('/GetLockedMenu/:id_fam', menu.Get_Current_Locked_Menu); 

//menu non verrouille en mode suggestion
router.get('/GetSuggestUnlockedMenu/:id_fam', menu.Get_Suggest_Unlocked_Menu);

//menu non verrouilles
router.get('/GetUnlockedMenu/:id_fam', menu.Get_Unlocked_Menu);

router.get('/GetMenuId/:id', menu.Get_Menu_By_Id);

//get menu complet
router.get('/GetAllInfo/:id', menu.Get_Menu_All_Info_PK);
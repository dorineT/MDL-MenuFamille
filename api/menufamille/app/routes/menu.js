const Router = require('express-promise-router')
const menu = require("../db/controller/menu.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', menu.findAll);

router.put('/PutMenu', menu.PutMenu);

router.post('/UpdateMenu/:id', menu.UpdateMenu);

router.delete('/DeleteMenu/:id', menu.DeleteMenu);

router.get('/GetLockedMenu/:id_fam', menu.Get_Current_Locked_Menu);

router.get('/GetManualUnlockedMenu/:id_fam', menu.Get_Manual_Unlocked_Menu);

router.get('/GetUnlockedMenu/:id_fam', menu.Get_Unlocked_Menu);

router.get('/GetMenuId/:id', menu.Get_Menu_By_Id);
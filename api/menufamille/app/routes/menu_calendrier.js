const Router = require('express-promise-router')
const menu_calendrier = require("../db/controller/menu_calendrier.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', menu_calendrier.findAll);

router.put('/PutMenuCalendrier', menu_calendrier.Put_Menu_Calender);

router.post('/UpdateMenuCalendrier/:id_menu/:id_calendrier', menu_calendrier.Update_Menu_Calender);

router.delete('/DeleteMenuCalendrier/:id_menu/:id_calendrier', menu_calendrier.Delete_Menu_Calender);
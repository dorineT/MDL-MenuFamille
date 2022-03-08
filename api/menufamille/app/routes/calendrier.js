const Router = require('express-promise-router')
const calendrier = require("../db/controller/calendrier.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', calendrier.findAll);

router.put('/PutCalendrier', calendrier.PutCalender);

router.post('/UpdateCalendrier/:id', calendrier.UpdateCalender);

router.delete('/DeleteCalendrier/:id', calendrier.DeleteCalender);
const Router = require('express-promise-router')
const calendrier_recette = require("../db/controller/calendrier_recette.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', calendrier_recette.findAll);

router.post('/PutCalendrierRecette', calendrier_recette.PutCalender_Recipe);

router.update('/UpdateCalendrierRecette/:id_calendrier/:id_recette', calendrier_recette.UpdateCalender_Recipe);

router.delete('/DeleteCalendrierRecette/:id_calendrier/:id_recette', calendrier_recette.DeletCalender_Recipe);
const Router = require('express-promise-router')
const calendrier_recette = require("../db/controller/calendrier_recette.controller.js");

const router = new Router()
module.exports = router



router.get('/', calendrier_recette.findAll);

router.post('/', calendrier_recette.PutCalender_Recipe);

router.put('/:id', calendrier_recette.UpdateCalender_Recipe);

router.delete('/:id', calendrier_recette.DeletCalender_Recipe);
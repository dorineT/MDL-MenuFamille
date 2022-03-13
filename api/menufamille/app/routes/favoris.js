const Router = require('express-promise-router')
const favoris = require("../db/controller/favoris.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Calender
router.get('/', favoris.findAll);

router.put('/PutCalendrier', favoris.PutFavorite);

router.post('/UpdateCalendrier/:id_recette/:id_membre', favoris.Update_Favoris);

router.delete('/DeleteCalendrier/:id_recette/:id_membre', favoris.DeletFavoris);
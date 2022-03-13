const Router = require('express-promise-router')
const denree_type = require("../db/controller/denree_type.controller.js");


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
module.exports = router


    // Retrieve all Types
router.get('/', denree_type.findAll);

router.put('/PutDenree_Type', denree_type.PutDenreeType);

router.post('/UpdateDenree_Type/:id_denree/:id_type', denree_type.Update_Denree_type);

router.delete('/DeleteDenree_Type/:id_denree/:id_type', denree_type.DeleteDenreeType);
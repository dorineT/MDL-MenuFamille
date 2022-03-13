const Router = require('express-promise-router')
const auth = require("../db/controller/auth.controller");
const { authJwt } = require("../middleware")
const role = require("../db/controller/famille_membre.controller");




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


router.get("/:id/parent", [authJwt.verifyToken, authJwt.isParent], role.parentBoard)

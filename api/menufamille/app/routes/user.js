const Router = require('express-promise-router')
const auth = require("../db/controller/auth.controller");
const membres = require("../db/controller/membres.controller.js");
const { verifySignUp, authJwt } = require("../middleware")
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

router.post("/signup",verifySignUp.checkDuplicateEmail,auth.signup);
router.post("/signin", auth.signin);
router.post("/refreshtoken", auth.refreshToken);

router.get("/parent", [authJwt.verifyToken, authJwt.isParent], role.parentBoard);
router.delete('/:id',[authJwt.verifyToken],membres.DeleteMember);
router.put("/:id", [authJwt.verifyToken], membres.UpdateMember);
router.put("/pwd/:id",[authJwt.verifyToken, authJwt.VerifyPwd], membres.UpdateMember)

router.delete("/notif/delete/:id_famille", [authJwt.verifyToken], membres.removeNotif);

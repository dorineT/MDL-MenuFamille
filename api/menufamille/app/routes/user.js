const Router = require('express-promise-router')
const auth = require("../db/controller/auth.controller");
const { verifySignUp } = require("../middleware")




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

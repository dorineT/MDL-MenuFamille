const db = require("../db/models");
const Membre = db.membres;
checkDuplicateEmail = (req, res, next) => {
    // Email
    console.log(req.body)
    Membre.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
}



const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};
module.exports = verifySignUp;
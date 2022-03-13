const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../db/models");
const Role = db.famille_membre

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res)
    }
    req.id_membre = decoded.id;
    next();
  });
};



isChild = (req, res, next) => {
  Role.findOne({where: {id_membre: req.id_membre, id_famille:  parseInt(req.params.id)}}).then(role => {
    if (role.role === "enfant") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Child Role!"
    });
      return;
    });
};

isParent = (req, res, next) => {
  Role.findOne({where: {id_membre: req.id_membre, id_famille:  parseInt(req.params.id)}}).then(role => {
    if (role.role === "parent") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Parent Role!"
    });
      return;
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isChild: isChild,
  isParent: isParent
};
module.exports = authJwt;
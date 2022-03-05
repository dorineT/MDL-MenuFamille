const db = require("../models");
const config = require("../../config/auth.config");
const Membre = db.membres;
const Token = db.refreshToken;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  // Save User to Database
  Token.create({
    token: bcrypt.hashSync(req.body.secret, 8)
  })
    .then(token => {
        Membre.create({id_token: token.id_token, nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, secret: req.body.secret})
        .then(_ => { 
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while inserting Member"
            });
        });
    })
    .catch(err => {
      res.status(500).send({ 
          message: err.message || "Some error occurred while inserting Member" 
        });
    });
};

exports.signin = (req, res) => {
  Membre.findOne({
    attributes: ['id_membre','nom','prenom','email', 'token'],
    where: {
      email: req.body.email
    },
    include: [Token]
  })
    .then(membre => {
      if (!membre) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.token,
        membre.token
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: membre.id_membre }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      
      res.status(200).send({
        id: membre.id,
        nom: membre.nom,
        prenom: membre.prenom,
        email: membre.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
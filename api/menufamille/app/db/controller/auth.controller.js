const db = require("../models");
const config = require("../../config/auth.config");
const Membre = db.membres;
const RefreshToken = db.refreshToken;
const Role = db.famille_membre;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Membre.create({
    nom: req.body.lastname,
    prenom: req.body.firstname,
    email: req.body.email,
    secret: bcrypt.hashSync(req.body.password, 8)
  })
    .then(_ => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Membre.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.secret
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      const token = jwt.sign({ id: user.id_membre }, config.secret, {
        expiresIn: config.jwtExpiration
      });
      let refreshToken = await RefreshToken.createToken(user);
      var authorities = [];
      Role.findAll({
        where: {id_membre: user.id_membre},
        include :[{
          model: db.famille,
        }]
      }).then(roles => {      
        for (let i = 0; i < roles.length; i++) {
          authorities.push([roles[i].id_famille,roles[i].famille.nom, roles[i].famille.nb_membres, roles[i].role])
        }

        res.status(200).send({
          id_membre: user.id_membre,
          lastname: user.nom,
          email: user.email,
          firstname: user.prenom,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
    console.log(refreshToken)
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id_refreshToken: refreshToken.id_refreshToken } });
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }
    const user = await Membre.findOne({where: {id_membre: refreshToken.id_membre}});
    let newAccessToken = jwt.sign({ id: user.id_membre }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
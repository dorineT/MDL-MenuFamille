const db = require("../models");
const Favoris = db.favoris;
const Op = db.Sequelize.Op;

// Retrieve all favorite from the database.
exports.findAll = (req, res) => {
    Favoris.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving favorite."
      });
    });  
};

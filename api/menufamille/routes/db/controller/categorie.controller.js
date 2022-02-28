const db = require("../models");
const Categorie = db.categorie;
const Op = db.Sequelize.Op;

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
    Categorie.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories."
      });
    });  
};

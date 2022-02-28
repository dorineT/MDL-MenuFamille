const db = require("../models");
const RecetteDenree = db.recette_denree;
const Op = db.Sequelize.Op;

// Retrieve all Recette_denree from the database.
exports.findAll = (req, res) => {
    RecetteDenree.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_denree."
      });
    });  
};

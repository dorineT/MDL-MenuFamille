const db = require("../models");
const Denree = db.denree;
const Op = db.Sequelize.Op;

// Retrieve all denree from the database.
exports.findAll = (req, res) => {
    Denree.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    });  
};

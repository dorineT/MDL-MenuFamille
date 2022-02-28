const db = require("../models");
const Famille = db.famille;
const Op = db.Sequelize.Op;

// Retrieve all famille from the database.
exports.findAll = (req, res) => {
    Famille.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving famille."
      });
    });  
};

const db = require("../models");
const Tag = db.tag;
const Op = db.Sequelize.Op;

// Retrieve all Tag from the database.
exports.findAll = (req, res) => {
    Tag.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tag."
      });
    });  
};
const db = require("../models");
const FamilleMembre = db.famille_membre;
const Op = db.Sequelize.Op;

// Retrieve all famille_membre from the database.
exports.findAll = (req, res) => {
    FamilleMembre.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving famille_membre."
      });
    });  
};

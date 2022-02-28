const db = require("../models");
const RecetteTag = db.recette_tags;
const Op = db.Sequelize.Op;

// Retrieve all Recette_tags from the database.
exports.findAll = (req, res) => {
    RecetteTag.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_tags."
      });
    });  
};

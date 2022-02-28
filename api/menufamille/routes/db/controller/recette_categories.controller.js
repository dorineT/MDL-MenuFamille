const db = require("../models");
const RecetteCategorie = db.recette_categories;
const Op = db.Sequelize.Op;

// Retrieve all Recette_categories from the database.
exports.findAll = (req, res) => {
    RecetteCategorie.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_categories."
      });
    });  
};

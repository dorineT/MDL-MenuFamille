const db = require("../models");
const DenreeType = db.denree_type;
const Op = db.Sequelize.Op;

// Retrieve all denree_type from the database.
exports.findAll = (req, res) => {
    DenreeType.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree_type."
      });
    });  
};

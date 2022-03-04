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


/// PUT CRUD
exports.PutDenreeType = (req, res) => {
  const new_denr_type = await DenreeType.create({id_denree: req[0], id_type: req[1]})
  .then(res.send([new_denr_type.id_denree, new_denr_type.id_type]))
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while instering Denree/type"
    });
  });
};


/// UPDATE CRUD 

  /// JE DOIS EN PARLER 


/// DELETE CRUD 

exports.DeleteDenreeType = (req, res) => {
  let denree_type_to_destroy = DenreeType.findAll({
    where: {
      [Op.add]: [
            id_denree = req[0],
            id_type = req[1]
          ]
      }
  });


  await denree_type_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting Denree/type"
    });
  });
};
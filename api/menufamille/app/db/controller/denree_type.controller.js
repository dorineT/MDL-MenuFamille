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
  DenreeType.create({id_denree: req.body.id_denree, id_type: req.body.id_type})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while instering Denree/type"
    });
  });
};


/// UPDATE CRUD 

exports.Update_Denree_type = (req, res) => {
  const id_denree = req.params.id_denree;
  const id_type = req.params.id_type;
  DenreeType.update(req.body, {
    where: { [Op.add]: 
        {id_denree: id_denree,
        id_type: id_type}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Denree_type was updated"
      });
    } else{
      res.send({
        message: `Cannot update Denree_type with id_denree=${id_denree} && id_type=${id_type}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Denree_type with id_denree=${id_denree} && id_type=${id_type}`
      });
  });
};


/// DELETE CRUD 

exports.DeleteDenreeType = (req, res) => {
  const id_denree = req.params.id_denree;
  const id_type = req.params.id_type;
  DenreeType.destroy({
    where: { [Op.add]: 
        {id_denree: id_denree,
        id_type: id_type}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Denree_type was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Denree_type with id_denree=${id_denree} && id_type=${id_type}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Denree_type with id_denree=${id_denree} && id_type=${id_type}`
      });
  });
};
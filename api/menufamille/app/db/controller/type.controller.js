const db = require("../models");
const Type = db.type;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Type.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });  
};


//un controleur par table
// pour les jointures, utiliser le include


/// Put CRUD

exports.PutType = (req, res) => {
  Type.create({nom: req.body.nom})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while inserting type"
      });
  });
};


/// Update CRUD 

exports.UpdateType = (req, res) => {
  const id = req.params.id;
  Type.update(req.body, {
    where: {id_type: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Type was Updated"
      });
    } else{
      res.send({
        message: `Cannot update type with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Type id=${id}`
      });
  });
};


/// delete CRUD 

exports.DeleteType = (req, res) => {
  const id = req.params.id;
  Type.destoy({
    where: {id_type: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Type was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete type with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Type id=${id}`
      });
  });
};

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


// Put CRUD 

exports.PutFamilly = (req, res) => {
  Famille.create({ nom: req.body.nom, code_acces: req.body.code_access, nb_members: req.body.nb_members})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting Familly"
    });
  });
};

// Update CRUD

exports.UpdateFamilly = (req, res) => {
  const id = req.params.id;
  Famille.update(req.body, {
    where: {id_famille: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Familly was Updated"
      });
    } else{
      res.send({
        message: `Cannot update familly with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating familly id=${id}`
      });
  });
};


  // Delete CRUD

  exports.DeleteFamilly = (req, res) => {
    const id = req.params.id;
    Famille.destroy({
      where: {id_famille: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Familly was Deleted"
        });
      } else{
        res.send({
          message: `Cannot delete familly with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while deleting familly id=${id}`
        });
    });
  };
  
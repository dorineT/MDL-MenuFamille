const db = require("../models");
const Denree = db.denree;
const Op = db.Sequelize.Op;

// Retrieve all denree from the database.
exports.findAll = (req, res) => {
    Denree.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    });  
};


// Put CRUD

exports.PutDenree = (req, res) => {
  Denree.create({ nom: req.body.nom, nutriscore: req.body.nutriscore})
  .then(data => {
    res.send(data);
  })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while inserting denree"
        });
    });
};


  //update CRUD
  
  exports.UpdateDenree = (req, res) => {
    const id = req.params.id;
    Denree.update(req.body, {
      where: {id_denree: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Denree was Updated"
        });
      } else{
        res.send({
          message: `Cannot update denree with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while updating denree id=${id}`
        });
    });
  };

  /// Delete CRUD 

    exports.DeleteDenree = (req, res) =>{
      const id = req.params.id;
      Denree.destropy({
        where: {id_denree: id}
      })
      .then(num =>{
        if (num == 1) {
          res.send({
            message: "Denree was deleted"
          });
        } else{
          res.send({
            message: `Cannot delete denree with id=${id}`
          })
        }
      })
      .catch(err => {
          res.status(500).send({
              message:
                err.message || `Some error occurred while deleting denree id=${id}`
          });
      });
    };
  
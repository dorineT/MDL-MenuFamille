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
          res.status(403).send({
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
  

  //// Find with like recipe

  exports.FindWithLike = (req, res) => {
    const lettres = req.params.nom + "%";
    Denree.findAll({
      where: { nom : {[Op.iLike]: lettres}}     
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    }); 
  }


  //// Find or Create 

  exports.FindOrCreate = (req, res) => {
    const nomArg = req.params.nom;
    Denree.findOrCreate({
      where: { nom:  nomArg }
    }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    }); 
  }

  //// Get nutriscore and calories

  exports.Get_Nut_and_Cal = (req, res) => {
    const id_denreeArg = req.params.id_denree
    Denree.findAll({
      where: {id_denree: id_denreeArg},
      attributes: ['nutriscore', 'calories']
    }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    });
  }
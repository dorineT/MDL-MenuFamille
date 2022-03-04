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
  const new_denree = await Denree.create({ nom: req[0], nutriscore: req[2]})
  .then(res.send(new_denree.id_denree))
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while inserting denree"
        });
    });
};


  //update CRUD
  
  exports.UpdateDenree = (req, res) => {
    let new_denree = Denree.findByPk(req[0]);

    new_denree.set({
      nom: req[1],
      nutriscore: req[2]
    });

    await new_denree.save()
    .then(res.send(true))
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating denree"
        });
    });
  };

  /// Delete CRUD 

    exports.DeleteDenree = (req, res) =>{
      let denree_to_destroy = Denree.findByPk(req[0]);

      await denree_to_destroy.destroy()
      .then(res.send(true))
      .catch(err => {
          res.status(500).send({
              message:
                err.message || "Some error occurred while deleting denree"
          });
      });
    };
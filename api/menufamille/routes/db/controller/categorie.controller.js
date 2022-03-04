const db = require("../models");
const Categorie = db.categorie;
const Op = db.Sequelize.Op;

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
    Categorie.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories."
      });
    });  
};


// Put CRUD

exports.PutCategory = (req, res) => {
  Categorie.create({ periode: req.body.periode})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
          err.message || "Some error occured while inserting category"
    });
  });
};

// Update CRUD

exports.UpdateCategory = (req, req) => {
  const id = req.params.id;
    Categorie.update(req.body, {
      where: {id_categorie: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Categorie was Updated"
        });
      } else{
        res.send({
          message: `Cannot update Categorie with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while updating Categorie id=${id}`
        });
    });
  };



/// Delete CRUD 

exports.DeleteCategory = (req, res) => {
  const id = req.params.id;
    Categorie.destroy({
      where: {id_categorie: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Categorie was destroyed"
        });
      } else{
        res.send({
          message: `Cannot delete Categorie with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while deleting Categorie id=${id}`
        });
    });
  };

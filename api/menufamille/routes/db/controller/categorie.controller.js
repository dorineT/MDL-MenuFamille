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
  const new_category = await Categorie.create({ periode: req[0]})
  .then(res.send(new_category.id_categorie))
  .catch(err => {
    res.status(500).send({
        message:
          err.message || "Some error occured while inserting category"
    });
  });
};

// Update CRUD
exports.UpdateCategory = (req, req) => {
  let new_category = Categorie.findByPk(req[0]);

  new.categorie.set({
      periode: req[1]
  });

  await new_category.save()
  .then(res.send(true))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while updating Recipe"
    });
  });
};


/// Delete CRUD 

exports.DeleteCategory = (req, res) => {
  let category_to_destroy = Categorie.findByPk(req[0]);

  await category_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while deleting Category"
    });
  });
};
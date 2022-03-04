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
  const new_familly = await Famille.create({ nom: req[0], code_acces: req[1], nb_members: req[2]})
  .then(res.send(new_familly.id_famille))
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting Familly"
    });
  });
};

// Update CRUD

exports.UpdateFamilly = (req, res) => {
  let new_familly = Famille.findByPk(req[0]);

  new_familly.set({
    nom: req[1],
    code_acces: req[2],
    nb_membres: req[3]
  });

  await new_familly.save()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while updating Familly"
      });
  });
};

  // Delete CRUD

  exports.DeleteFamilly = (req, res) => {
    let familly_to_destroy = Famille.findByPk(req[0]);

    await familly_to_destroy.destroy()
    .then(res.send(true))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting a familly"
      });
    });
  };
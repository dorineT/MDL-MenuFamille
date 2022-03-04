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
  const new_type = await Type.create({nom: req[0]})
  .then(res.send(new_type.id_type))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while inserting Types"
      });
  });
};


/// Update CRUD 

exports.UpdateType = (req, res) => {
  const new_type = Type.findByPk(req[0])

  new_type.set({
    nom: req[1]
  })

  await new_type.save()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while updating Type"
      });
  });
}


/// delete CRUD 

exports.DeleteType = (req, res) => {
  let type_to_destroy = Type.findByPk(req[0])

  await type_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Type"
      });
  });
};

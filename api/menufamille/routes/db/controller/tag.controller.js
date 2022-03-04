const db = require("../models");
const Tag = db.tag;
const Op = db.Sequelize.Op;

// Retrieve all Tag from the database.
exports.findAll = (req, res) => {
    Tag.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tag."
      });
    });  
};



//un controleur par table
// pour les jointures, utiliser le include


/// Put CRUD

exports.PutTag = (req, res) => {
  const new_tag = await Tag.create({nom: req[0]})
  .then(res.send(new_tag.id_tag))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while inserting tag"
      });
  });
};


/// Update CRUD 

exports.UpdateTag = (req, res) => {
  const new_tag = Tag.findByPk(req[0])

  new_tag.set({
    nom: req[1]
  })

  await new_tag.save()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while updating tag"
      });
  });
}


/// delete CRUD 

exports.Deletetag = (req, res) => {
  let tag_to_destroy = Tag.findByPk(req[0])

  await tag_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Tag"
      });
  });
};

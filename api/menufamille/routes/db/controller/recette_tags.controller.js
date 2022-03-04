const db = require("../models");
const RecetteTag = db.recette_tags;
const Op = db.Sequelize.Op;

// Retrieve all Recette_tags from the database.
exports.findAll = (req, res) => {
    RecetteTag.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_tags."
      });
    });  
};


/// PUT CRUD

exports.PutRecipe_tag = (req, res) => {
  const new_rec_tag = await RecetteTag.create({id_recette: req[0], id_tag: req[1]})
  .then(res.send(new_rec_tag))
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Recipe/tags"
    });
  });
};


/// UPDATE CRUD

/// FAUT EN PARLER


/// DELETE CRUD

exports.Delete_Recipe_Tag = (req, res) => {
  let recipe_tag_to_destroy = RecetteTag.findAll({
      where: {
        [Op.add]: [
              id_recette = req[0],
              id_tag = req[1]
            ]
      }
  });

  await recipe_tag_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Recipe/tags"
      });
  });
};
const db = require("../models");
const RecetteDenree = db.recette_denree;
const Op = db.Sequelize.Op;

// Retrieve all Recette_denree from the database.
exports.findAll = (req, res) => {
    RecetteDenree.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_denree."
      });
    });  
};


/// PUT CRUD

exports.PutRecipe_Denree = (req, res) => {
  RecetteDenree.create({
    id_recette: req.body.id_recette,
    id_denree: req.body.id_denree,
    quantite: req.body.quantite,
  mesure: req.body.mesure
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Recipe/denree"
    });
  });
};


  //// Update CRUD
  exports.UpdateRecipe_Denree = (req, res) => {
    const id_recette = req.params.id_recipe;
    const id_denree = req.params.id_denree;
    RecetteTag.update(req.body, {
      where: { [Op.add]: 
          {id_recette: id_recette,
           id_denree: id_denree}
      }
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Recipe_Denree was updated"
        });
      } else{
        res.send({
          message: `Cannot update Recipe_Denree with id_recette=${id_recette} && id_denree=${id_denree}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while updating Recipe_Denree with id_recette=${id_recette} && id_denree=${id_denree}`
        });
    });
  };

/// DELETE CRUD

exports.Delete_Recipe_Denree = (req, res) => {
  const id_recette = req.params.id_recipe;
  const id_denree = req.params.id_denree;
  RecetteTag.destroy({
    where: { [Op.add]: 
        {id_recette: id_recette,
         id_denree: id_denree}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Recipe_Denree was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Recipe_Denree with id_recette=${id_recette} && id_denree=${id_denree}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Recipe_Denree with id_recette=${id_recette} && id_denree=${id_denree}`
      });
  });
};
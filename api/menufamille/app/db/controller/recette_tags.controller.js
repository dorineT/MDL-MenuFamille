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
  RecetteTag.create({id_recette: req.body.id_recette, id_tag: req.body.id_tag})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Recipe/tags"
    });
  });
};


/// UPDATE CRUD
exports.Update_Recipe_tag  = (req, res) => {
  const id_recette = req.params.id_recipe;
  const id_tag = req.params.id_tag;
  RecetteTag.update(req.body, {
    where: { [Op.add]: 
        {id_recette: id_recette,
         id_tag: id_tag}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Recipe_tag was updated"
      });
    } else{
      res.send({
        message: `Cannot update Recipe_tag with id_recette=${id_recette} && id_tag=${id_tag}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Recipe_tag with id_recette=${id_recette} && id_tag=${id_tag}`
      });
  });
};



/// DELETE CRUD

exports.Delete_Recipe_Tag = (req, res) => {
  const id_recette = req.params.id_recipe;
  const id_tag = req.params.id_tag;
  RecetteTag.destroy({
    where: { [Op.add]: 
        {id_recette: id_recette,
         id_tag: id_tag}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Recipe_tag was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Recipe_tag with id_recette=${id_recette} && id_tag=${id_tag}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Recipe_tag with id_famille=${id_famille} && id_membre=${id_membre}`
      });
  });
};

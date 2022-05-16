const db = require("../models");
const RecetteCategorie = db.recette_categories;
const Op = db.Sequelize.Op;

// Retrieve all Recette_categories from the database.
exports.findAll = (req, res) => {
    RecetteCategorie.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_categories."
      });
    });  
};



/// PUT CRUD

exports.Put_Recipe_Category = (req, res) => {
  RecetteCategorie.create({id_recette: req.body.id_recette, id_categorie: req.body.id_categorie})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Rec/Cate"
    });
  });
};


/// UPDATE CRUD

exports.Update_Recipe_Category = (req, res) => {
  const id_recipe = req.params.id_recette;
  const id_category = req.params.id_categorie;
  MenuCalendrier.update(req.body, {
    where: { [Op.add]: 
        {id_recette: id_recipe,
        id_categorie: id_category}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Recipe_Category was updated"
      });
    } else{
      res.send({
        message: `Cannot update Recipe_Category with id_recipe=${id_recipe} && id_category=${id_category}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Menu_Calender with id_recipe=${id_recipe} && id_category=${id_category}`
      });
  });
};


/// DELETE CRUD

exports.Delete_Recipe_Category = (req, res) => {
  const id_recipe = req.params.id_recipe;
  const id_category = req.params.id_category;
  MenuCalendrier.destroy({
    where: { [Op.add]: 
       {id_recette: id_recipe,
        id_categorie: id_category}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Recipe_Category was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Recipe_Category with id_recipe=${id_recipe} && id_category=${id_category}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Menu_Calender with id_recipe=${id_recipe} && id_category=${id_category}`
      });
  });
};
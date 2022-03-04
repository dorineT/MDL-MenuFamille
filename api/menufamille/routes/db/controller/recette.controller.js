
/* this file need the classes files to work. please merge them as soon as possible thanks a lot. 
the Sequelize should be okay but need testing too */

/*function Search_recipe(S_Tag, S_Type){

    const{Op} = require('@sequelize/core');
    
    let recipes = null;

    if (S_Tag == null && S_Type == null) {
        recipes = Recipe.findAll();
    } else if (S_Tag == null) {
        recipes = Recipe.findAll({
            where: {
                type = S_Type
            }
        });
    } else if (S_Type == null) {
        recipes = Recipe.findAll({
            where: {
                tag = S_Tag
            }
        });
    } else {
        recipes = Recipe.findAll({
            where: {
                [Op.add]: [
                    type = S_Type,
                    tag = S_Tag
                ]
            }
        });
    }

    return recipes;
}*/



/**
 * lister toutes les recttes avec leur tags
 * chercher une recette et obtenir TOUTES ses infos
 * + crud habituel
 * 
 * 
 * se baser sur type.controller.js (fonctionne) (dossier controller)
 * et les infos sont sur la bd en ligne de david
 * les routes sont ajouter dans index.js pour la base
 * les spec de route (dossier route) dans un fichier dédié (voir type.js)
 * idem un par table
 */

const { recette } = require("../models");
const db = require("../models");
const Recipe = db.recette;
const Op = db.Sequelize.Op;

/// GetAllRecipes Simple for CRUD

exports.findAll = (req, res) => {
    Recipe.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recipes."
      });
    });  
};

/// Put CRUD

exports.PutRecipe = (req, res) => {
    Recipe.create({ nom: req.body.nom, difficulte: req.body.difficulte, calorie: req.body.calorie, temps_cuisson: res.body.temps_cuisson, temps_preparation: req.body.temps_preparation, nb_personne: req.body.nb_personne, nutriscore: req.body.nutriscore, preparation: req.body.preparation})
    .then(data => { 
        res.send(data);
      })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while inserting Recipes"
        });
    });
};

//// Update CRUD
exports.UpdateRecipe = (req, res) => {
    const id = req.params.id;
    Recipe.update(req.body, {
      where: {id_recette: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Recipe was Updated"
        });
      } else{
        res.send({
          message: `Cannot update recipe with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while updating recipe id=${id}`
        });
    });
  };

//// Delete CRUD

exports.DeleteRecipe = (req, res) => {
    const id = req.params.id;
    Recipe.destroy({
      where: {id_recette: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Recipe was delete"
        });
      } else{
        res.send({
          message: `Cannot delete recipe with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while deleting recipe id=${id}`
        });
    });
  };

/// GetAllRecipes with tags

 exports.findAllTags = (req, res) => {
    Recipe.findAll({ include: recette_tags })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recipes."
      });
    });  
};

/// Chercher une recette

exports.findRecipe = (req, res) => {
    Recipe.findByPk(req.params.id_recette, { include: recette_tags, recette_categories, recette_denree})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Recipes."
        });
      });  
};
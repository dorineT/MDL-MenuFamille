
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
    const new_recipe = await Recipe.create({ nom: req[0], difficulte: req[1], calorie: req[2], temps_cuisson: res[3], temps_preparation: req[4], nb_personne: req[5], nutriscore: req[6], preparation: req[7]})
    .then(res.send(new_recipe.id_recette))
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while inserting Recipes"
        });
    });
}

//// Update CRUD
exports.UpdateRecipe = (req, res) => {
    let new_recipe = Recipe.findByPk(req[0]);

    new_recipe.set({
        nom: req[1],
        difficulte: req[2],
        calorie: req[3],
        temps_cuisson: req[4],
        temps_preparation: req[5],
        nb_personne: req[6],
        nutriscore: req[7],
        preparation: req[8]

    });

    await new_recipe.save();
}

//// Delete CRUD

exports.DeleteRecipe = (req, res) => {
    let recipe_to_destroy = Recipe.findByPk(req[0]);

    await recipe_to_destroy.destroy();
}

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


/// GetAllRecipes with tags

exports.findAllTags = (req, res) => {
    Recipe.findAll({ include: {model: recette_tags, as: "tags" }})
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
    Recipe.findByPk(req[0], { include: recette_tags, recette_categories, recette_denree})
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
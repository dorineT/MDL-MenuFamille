
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
const Tag = db.tag;
const Categorie = db.categorie;
const Denree = db.denree;
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
  console.log(req.body);
    Recipe.create({ nom: req.body.nom, difficulte: req.body.difficulte, calorie: req.body.calorie, temps_cuisson: req.body.temps_cuisson, temps_preparation: req.body.temps_preparation, nb_personne: req.body.nb_personne, nutriscore: req.body.nutriscore, preparation: req.body.preparation})
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

 exports.find_All_Tags = (req, res) => {
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

exports.find_Recipe = (req, res) => {
    Recipe.findByPk(req.params.id, {include: [{model: Tag, through: {attributes: []}}, {model: Categorie, through: {attributes: []}}, {model: Denree, through: {attributes: ["quantite"]}}]})
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

/// Chercher recette avec toutes les infos #40

exports.find_Recipe_With_Tags= (req, res) => {
  Recipe.findAll({include: {model: Tag, through: {attributes: []}}})
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

/// envoyer les recettes (nom et id seulement, pas besoin de plus) qui matchent les tags globaux du menu ou les tags precis du calendrier jour) #40

exports.find_Recipe_tags = (req, res) => {
  const tagsListe = req.query.tag;
  console.log('coucou')
  console.log(tagsListe)
  let temp = []
  Recipe.findAll({
    include:{
      model: Tag,
      where:{
        nom: {
          [Op.in]: tagsListe
        }
      }
    }
  }).then( data =>{

    //refaire un filtre 
    temp = data.filter(function(recette){							
      let tagReTemp = []
      recette.tags.forEach(tagRecette => {      
        tagReTemp.push(tagRecette.nom)
      });

      if(tagsListe.every(el => {					
        return tagReTemp.includes(el)
      }))return recette
    })

    res.send(temp)
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Recipes."
    });
  });  
}


// Créer une recette avec absolument tout (recette + tags + catégories + denrées ) --> impossible à faire avec des includes, on va tout cascader

exports.Create_Recipe_All_Infos = (req, res) => {
  
  Recipe.create({ nom: req.body.nom, difficulte: req.body.difficulte, calorie: req.body.calorie, temps_cuisson: req.body.temps_cuisson, 
                  temps_preparation: req.body.temps_preparation, nb_personne: req.body.nb_personne, nutriscore: req.body.nutriscore, 
                  preparation: req.body.preparation, url_image: req.body.url_image})
  .then(data => { 
    const id_new_recette = data.id_recette;;

    /// On tacle d'abords les Tags  
    req.body.tags.forEach(tag => {
      db.recette_tags.create({ id_recette: id_new_recette, id_tag: tag.id_tag});
    });

    /// Au tour des Catégories
    req.body.categories.forEach(categorie => {
      db.recette_categories.create({ id_recette: id_new_recette, id_categorie: categorie.id_categorie});
    });

    /// Enfin les Denrées
    req.body.denrees.forEach(denree => {
      db.recette_denree.create({ id_recette: id_new_recette, id_denree : denree.id_denree, quantite : denree.recette_denree.quantite});
    });
    
    res.send(data);
    
    })
  .catch(err => {
      res.status(500).send({
          message:
            err || "Some error occurred while inserting Recipes"
      });
  });
}


/// aray de chaque calorie et nutriscore des 
exports.GetAllNutAndCal = (req, res) => {

  Recipe.findByPk(req.params.id_recette, {include: {model: Denree, attributes: ["nutriscore", "calories"], through : {attributes: []}}})
  .then(data => {
      res.send(data.denrees)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Recipes."
        });
      });  
}
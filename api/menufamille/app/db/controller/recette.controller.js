
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
    Recipe.findByPk(req.params.id, {
      include: [{model: Tag, through: {attributes: []}}, {
        model: Categorie, through: {attributes: []}
      }, {model: Denree, through: {attributes: ["quantite","mesure"]}}],

    })
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
  Recipe.findAll(
    {
      include:[
        {
          model: Tag, through: {attributes: []}
        },
        {
          model: db.categorie
        }
      ],
      order: [
        [Categorie, 'periode', 'ASC']
      ] 
    }
  )
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
      db.recette_tags.create({ id_recette: id_new_recette, id_tag: tag.id_tag}).catch(err => {
        res.status(500).send({
            message:
              err || "Some error occurred while inserting Recipes tag"
        });
    });
    });

    /// Au tour des Catégories
    req.body.categories.forEach(categorie => {
      db.recette_categories.create({ id_recette: id_new_recette, id_categorie: categorie.id_categorie}).catch(err => {
        res.status(500).send({
            message:
              err || "Some error occurred while inserting recette categorie"
        });
    });
    });

    /// Enfin les Denrées
    req.body.denrees.forEach(denree => {
      db.recette_denree.create(
        { 
          id_recette: id_new_recette, 
          id_denree : denree.id_denree, 
          quantite : denree.recette_denree.quantite,
          mesure: denree.recette_denree.mesure
        
        }).catch(err => {
        res.status(500).send({
            message:
              err || "Some error occurred while inserting denree recette"
        });
    });
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


/// array de chaque calorie et nutriscore des 
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

/// get mean of nutriscore and calories for a recipe

exports.GetMeanNutAndCal = (req, res) => {

  Recipe.findByPk(req.params.id_recette, {include: {model: Denree, attributes: ["nutriscore", "calories"], through : {attributes: []}}})
  .then(data => {
    
    let tmp_nut = 0;
    let tmp_cal = 0;
    let nb_iter_nut = 0;
    let nb_iter_cal = 0;
    let retour = new Object(); 

    data.denrees.forEach(denree =>{
        if (denree.calories != null){
        tmp_cal = tmp_cal + denree.calories;
        nb_iter_cal = nb_iter_cal + 1;
        }
        switch(denree.nutriscore) {
          case 'A' : tmp_nut = tmp_nut + 1 
                     nb_iter_nut = nb_iter_nut + 1;
            break;
          case 'B' : tmp_nut = tmp_nut + 2
                     nb_iter_nut = nb_iter_nut + 1;
            break;
          case 'C' : tmp_nut = tmp_nut + 3
                     nb_iter_nut = nb_iter_nut + 1;
            break;
          case 'D' : tmp_nut = tmp_nut + 4
                     nb_iter_nut = nb_iter_nut + 1;
            break;
          case 'E' : tmp_nut = tmp_nut + 5
                    nb_iter_nut = nb_iter_nut + 1;
            break;
        }
      })
    retour.calorie = tmp_cal /  nb_iter_cal;
    tmp_nut = tmp_nut / nb_iter_nut;
    if (1 <= tmp_nut <= 1.5 ){
      retour.nutriscore = 'A';
    } else if (1.5 < tmp_nut <= 2.5) {
      retour.nutriscore = 'B';
    } else if (2.5 < tmp_nut <= 3.5) {
      retour.nutriscore = 'C';
    } else if (3.5 < tmp_nut <= 4.5) {
      retour.nutriscore = 'D';
    } else {
      retour.nutriscore = 'E';
    }
    
    res.send(retour);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Recipes."
        });
      });  
}

/// get back a list of recipe from it's categories

exports.Get_From_Cat = (req, res) => {
  let periode_req = req.params.periode;
  Recipe.findAll({
    where :{
      '$categories.periode$': periode_req
    },
    include :[{model: Tag, through: {attributes: []}}, {model: Categorie, as: "categories", through: {attributes: []}}, {model: Denree, through: {attributes: ["quantite"]}}]
  }).then(data => {
      res.send(data)
  })
  .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recipes."
      });
    });
}
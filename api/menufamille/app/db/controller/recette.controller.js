
const { recette, denree } = require("../models");
const db = require("../models");
const Recipe = db.recette;
const Tag = db.tag;
const Categorie = db.categorie;
const Denree = db.denree;
const Op = db.Sequelize.Op;
const { asyncForEach } = require("../../middleware/asyncForEach");



/// Chercher une recette

exports.find_Recipe = (req, res) => {
  Recipe.findByPk(req.params.id, {
    include: [{ model: Tag, through: { attributes: [] } }, {
      model: Categorie, through: { attributes: [] }
    }, { model: Denree, through: { attributes: ["quantite", "mesure"] } }],

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

exports.find_Recipe_With_Tags = (req, res) => {
  Recipe.findAll(
    {
      include: [
        {
          model: Tag, through: { attributes: [] }
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
  let temp = []
  Recipe.findAll({
    include: [
      {
        model: Tag,
        where: {
          nom: {
            [Op.in]: tagsListe
          }
        },
      },
      {
        model: Categorie, as: "categories", through: { attributes: [] },
        where: {
          '$categories.periode$': req.params.periode
        }
      }
    ]
  }).then(data => {

    //refaire un filtre 
    temp = data.filter(function (recette) {
      let tagReTemp = []
      recette.tags.forEach(tagRecette => {
        tagReTemp.push(tagRecette.nom)
      });

      if (tagsListe.every(el => {
        return tagReTemp.includes(el)
      })) return recette
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
//ici

exports.Create_Recipe_All_Infos = async (req, res) => {

  // on doit d'abords creer les nutriscores et les calories qu'on va ajouter à la recette

  let tmp_nut = 0;
  let tmp_cal = 0;
  let nb_iter_nut = 0;
  let nb_iter_cal = 0;
  let nutriscore = 0;
  let calorie = 0;
  await asyncForEach(req.body.denrees, async (denree) => {
    console.log(denree.calories + " : "+ typeof(denree.calories))
    console.log(denree.recette_denree.quantite + " : "+ typeof(denree.recette_denree.quantite))
    quantite = 0;
    let quantite_denree = parseInt(denree.recette_denree.quantite)
    switch (denree.recette_denree.mesure.toLowerCase()) {
      case 'gr': quantite = quantite_denree;
        break;
      case 'unité': quantite = quantite_denree;
        break;
      case 'ml': quantite = quantite_denree;
        break;
      case 'kg': quantite = quantite_denree * 1000;
        break;
      case 'l': quantite = quantite_denree * 1000;
        break;
      case 'dl' : quantite = quantite_denree * 100;
        break;
      case 'cl' : quantite = quantite_denree * 10;
        break;
      case 'cr' : quantite = quantite_denree / 100
    }

    if (denree.calories != null) {

      tmp_cal = tmp_cal + (parseInt(denree.calories) * quantite);
      nb_iter_cal = nb_iter_cal + quantite;

    }
    switch (denree.nutriscore) {
      case 'A': tmp_nut = tmp_nut + (1 * quantite)
        nb_iter_nut = nb_iter_nut + quantite;
        break;
      case 'B': tmp_nut = tmp_nut + (2 * quantite)
        nb_iter_nut = nb_iter_nut + quantite;
        break;
      case 'C': tmp_nut = tmp_nut + (3 * quantite)
        nb_iter_nut = nb_iter_nut + quantite;
        break;
      case 'D': tmp_nut = tmp_nut + (4 * quantite)
        nb_iter_nut = nb_iter_nut + quantite;
        break;
      case 'E': tmp_nut = tmp_nut + (5 * quantite)
        nb_iter_nut = nb_iter_nut + quantite;
        break;
    }
  });


  calorie = tmp_cal / nb_iter_cal;
  tmp_nut = tmp_nut / nb_iter_nut;

  calorie = Math.floor(calorie);

  if (1 <= tmp_nut && tmp_nut <= 1.5) {
    nutriscore = 'A';
  } else if (1.5 < tmp_nut && tmp_nut <= 2.5) {
    nutriscore = 'B';
  } else if (2.5 < tmp_nut && tmp_nut <= 3.5) {
    nutriscore = 'C';
  } else if (3.5 < tmp_nut && tmp_nut <= 4.5) {
    nutriscore = 'D';
  } else {
    nutriscore = 'E';
  }

  await Recipe.create({
    nom: req.body.nom, difficulte: req.body.difficulte, calorie: calorie, temps_cuisson: req.body.temps_cuisson,
    temps_preparation: req.body.temps_preparation, nb_personne: req.body.nb_personne, nutriscore: nutriscore,
    preparation: req.body.preparation, url_image: req.body.url_image
  })
    .then(async (data) => {
      const id_new_recette = data.id_recette;;

      /// On tacle d'abords les Tags  

      await asyncForEach(req.body.tags, async (tag) => {
        await db.recette_tags.create({ id_recette: id_new_recette, id_tag: tag.id_tag }).catch(err => {
          res.status(500).send({
            message:
              err || "Some error occurred while inserting Recipes tag"
          });
        });
      });

      /// Au tour des Catégories

      await asyncForEach(req.body.categories, async (categorie) => {
        await db.recette_categories.create({ id_recette: id_new_recette, id_categorie: categorie.id_categorie }).catch(err => {
          res.status(500).send({
            message:
              err || "Some error occurred while inserting recette categorie"
          });
        });
      });

      /// Enfin les Denrées

      await asyncForEach(req.body.denrees, async (denree) => {
        await db.recette_denree.create(
          {
            id_recette: id_new_recette,
            id_denree: denree.id_denree,
            quantite: denree.recette_denree.quantite,
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

  Recipe.findByPk(req.params.id_recette, { include: { model: Denree, attributes: ["nutriscore", "calories"], through: { attributes: [] } } })
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


/// get back a list of recipe from it's categories

exports.Get_From_Cat = (req, res) => {
  let periode_req = req.params.periode;
  Recipe.findAll({
    where: {
      '$categories.periode$': periode_req
    },
    include: [{ model: Tag, through: { attributes: [] } }, { model: Categorie, as: "categories", through: { attributes: [] } }, { model: Denree, through: { attributes: ["quantite"] } }]
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
// test avec id 102 = frite
exports.get_price = async (req, res) => {
  var shop = {
    "colruyt": "boni",
    "delhaize": "365",
    "carrefour": " carrefour",
    "intermarche": "intermarche"
  }
  var list_for_retrun = {}
  var temp = {}

  Recipe.findByPk(req.params.id, {
    include: [{
      model: Denree,
      include: [
        {
          model: db.type
        }
      ]
    }]
  }).then(async (data) => {

    await asyncForEach(data.denrees, async (denray) => {
      let list_type = []
      let name = denray.nom


      await asyncForEach(denray.types, async (typent) => {
        list_type.push(`"${typent.nom}"`)
      })
      let request = `{"nom":"${name}","types":[${list_type}]}`
      let list_answer = await getProduct(JSON.parse(request))


      //id,region,brand,shops
      await asyncForEach(list_answer, async (product) => {




        let price_product = await get_comparse_for_product(product.code, 10)
        //console.log(price_product.data)

        let json_price = []

        await asyncForEach(price_product.data, async (thisOne) => {

          let subOne = {
            toString() {
              return `{"product":{"name_fr":${thisOne.name_fr},"brand":${thisOne.brand},"shop_fr":${thisOne.shop_fr},"photo":${thisOne.photo},"unit":${thisOne.unit},"price":${thisOne.price},"price_per_unit":${thisOne.price_per_unit},"date":${thisOne.date},"url_fr":${thisOne.url_fr}}}`
            }
          };
          console.log("sub= ", JSON.parse(subOne))

          json_price.push(subOne)
        })

        //temp = `{nom:${product.nom},info:[${json_price}]}`
        list_for_retrun[`{"nom":"${product.nom}"`] = `info:[${json_price}]}`
      })



    })

    res.send(list_for_retrun)
  }


  ).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Recipes."
    });
  });
}
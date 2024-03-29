const db = require("../models");
const Menu = db.menu;
const Op = db.Sequelize.Op;

const moment = require('moment')
const { asyncForEach } = require("../../middleware/asyncForEach");

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
  Menu.findAll()
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menus."
      });
    });
};

exports.getFood = (req, res) => {
  db.calendrier_recette.findAll({
    attributes: ['nb_personne'],
    include: [{
      model: db.calendrier,
      required: true,
      attributes: [],
      include: 
      {
        model: db.menu,
        required: true,
        attributes: [],
        where: { id_menu: req.params.id_menu }
      }
    },
  {
    model: db.recette,
    required: true,
    attributes: ['nb_personne'],
    include: {
      model: db.denree,
      as: 'denrees',
      required: true,
      attributes: ['nom'],
      through: {model: db.recette_denree, required: true, attributes: ['mesure','quantite']}
      
    }
  }]
  })
  .then(data => {
          let send = [];
          for (let i=0;i<data.length;i++) {
            for (let a=0;a<data[i].recette.denrees.length;a++) {
              let calc = Math.round(((data[i].recette.denrees[a].recette_denree.quantite * data[i].nb_personne) / data[i].recette.nb_personne) || 1)
              let quantite = (calc === 0?1:calc)
              if(send.some(products => products.nom === data[i].recette.denrees[a].nom )) {
                let index = send.indexOf(send.filter(products => products.nom === data[i].recette.denrees[a].nom )[0])
                send[index].quantite = send[index].quantite + quantite
              } else {
                send.push(
                  {
                    'nom': data[i].recette.denrees[a].nom,
                    'quantite': quantite,
                    'mesure': data[i].recette.denrees[a].recette_denree.mesure
                  }
                )
              }
            }
          }
          res.send(send);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Menus."
          });
        });
}

/// Put CRUD

exports.PutMenu = (req, res) => {
  console.log(req.body)
  /* Menu.create ({id_famille: req.body.id_famille, periode_debut: req.body.periode_debut, periode_fin: req.body.periode_fin, plat_identique: req.body.plat_identique, type: req.body.type})
   .then(data => { 
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while insering in Menu"
     });
   });*/
};

/// Update CRUD

exports.UpdateMenu = async (req, res) => {

  moment.locale('fr')
  const id = req.params.id;
  req.body.periode_debut = moment(req.body.periode_debut,"DD/MM/YYYY")
  req.body.periode_fin = moment(req.body.periode_fin,"DD/MM/YYYY")
  await Menu.update(req.body, {
    where: {id_menu: id,verrou: false}
  })
      .then(async(num) =>{
        if (num == 1) {
          if (req.body.verrou == true){


          await db.suggestion.findAll({
            where: {
              id_menu : id
            }
          })
              .then(async(data) => {

                await asyncForEach(data,async(this_suggest)=>{
                  await db.suggestion.destroy({
                    where: {

                      id_periode : this_suggest.id_periode,
                      id_recette : this_suggest.id_recette,
                      id_membre : this_suggest.id_membre,
                      id_menu : this_suggest.id_menu

                    }
                  })
                })
                res.send({
                  message: `menu was updated`
                })
              })

        } else {
          res.send({
            message: `menu was updated`
          })
        }
      }else{
          res.send({
            message: `Cannot update Menu with id=${id}`})
        }})
      .catch(err => {
        res.status(500).send({
          message:
              err.message || `Some error occurred while updating Menu id=${id}`
        });
      });
};


/// Delete CRUD 

exports.DeleteMenu = (req, res) => {
  const id = req.params.id;
  Menu.destroy({
    where: { id_menu: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Menu was Deleted"
        });
      } else {
        res.send({
          message: `Cannot delete Menu with id=${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while Delete Menu id=${id}`
      });
    });
};

///GetMenuAllInfo  recupérer un menu avec son id avec jour, les périodes (mêmes celles qui ne sont pas liées à une recette), les recettes et leur tag + les tags qui sont liés aux périodes

exports.Get_Menu_All_Info_PK = (req, res) => {
  const id_menu = req.params.id;
  Menu.findByPk(id_menu, {
    include: [
      {
        model: db.calendrier,
        include: [
          {
            model: db.calendrier_recette,
            include: [
              {
                model: db.recette,
                required: false,
                attributes: ['nom'],
                include:
                {
                  model: db.tag, required: false, through: { attributes: [] }
                }
              },
              {
                model: db.suggestion,
                required: false,
                include: [
                  {
                    model: db.membres,
                    attributes: ['nom','prenom','id_membre']
                  },
                  {
                    model: db.recette, required: false, attributes: ['nom'],
                    include:
                    {
                      model: db.tag, required: false, through: { attributes: [] }
                    }
                  }
                ]
              },
              {
                model: db.tag, required: false, through: { attributes: [] }
              }
            ]
          }
        ]
      }
    ],
    order: [
      [db.calendrier, 'date', 'ASC'],
      [db.calendrier, db.calendrier_recette, 'id_periode', 'ASC']
    ]
  })
    .then(response => {

      res.send(response);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menus."
      });
    });
};


/**
 * envoyer les menus verrouillés dont la date n'est pas passée (pas des menus qui datent de 2 semaines)
 * pour une famille donnée
 */
exports.Get_Current_Locked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  const date = Date.now();
  db.menu.findAll({
    where:
    {
      id_famille: id_fam,
      verrou: true,
      periode_fin: { [Op.gte]: date }
    },
    order: [
      ['periode_debut', 'ASC']
    ]
  }).then(response => {

    res.send(response)
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locked Menus."
      });
    });
};


//// Envoyer les menus non-verrouilles en mode suggestion
exports.Get_Suggest_Unlocked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  let menus = [];
  const date = Date.now();
  Menu.findAll({
    where: {
      [Op.and]:
      {
        id_famille: id_fam,
        verrou: false,
        type: 'suggestion',
        periode_fin: { [Op.gte]: moment().subtract(this.days_until_suggestion, 'days').format() },
      }
    }
  })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving unlocked manual Menus."
      });
    });
};


//// Envoyer les menus non vérrouillés 

exports.Get_Unlocked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  const date = Date.now()
  Menu.findAll({
    where: {
      [Op.and]:
      {
        id_famille: id_fam,
        verrou: false,
        periode_fin: { [Op.gte]: date }
      }
    }
  })
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving unlocked Menus."
      });
    });
};


//// GetById

exports.Get_Menu_By_Id = (req, res) => {
  const id = req.params.id;
  Menu.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving Menus with id=${id}.`
      });
    });
};


exports.old_menu = async (req, res) => {

  const id_fam = req.params.id_fam;
  await Menu.findAll({

    where: {
      id_famille: id_fam,
      periode_fin: { [Op.lt]: moment().format() }
    },


    through: { attributes: [] }



  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Menus."
    });
  });
}


//creation du menu -> recevoir un menu et toute ses infos
/**
 *
 * @param req
 * {
        "periode_debut": "04/10/2022",
        "periode_fin": "04/12/2022",

        "id_famille": 3,
        "plat_identique_matin": -1,
        "plat_identique_midi": -1,
        "plat_identique_soir": -1,
        "days_until_suggestion": 2,
        "type": "manuel",
        "verrou": false,
        "calendriers": [
            {
                "date": "04/10/2022",

                "calendrier_recettes": [
                    {


                        "id_recette": 100,
                        "periode": "matin",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    },
                    {


                        "id_recette": 101,
                        "periode": "midi",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    },
                    {


                        "id_recette": 102,
                        "periode": "soir",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    }
                ]
            },
            {
                "date": "04/11/2022",
                "calendrier_recettes": [
                    {

                        "id_recette": 100,
                        "periode": "matin",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    },
                    {

                        "id_recette": 101,
                        "periode": "midi",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    },
                    {

                        "id_recette": 102,
                        "periode": "soir",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    }
                ]
            },
            {
                "date": "04/12/2022",

                "calendrier_recettes": [
                    {

                        "id_recette": 100,
                        "periode": "matin",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    },
                    {

                        "id_recette": 101,
                        "periode": "midi",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : []
                    },
                    {

                        "id_recette": 102,
                        "periode": "soir",
                        "is_recette": true,
                        "nb_personne": 1,
                        "tags" : [
                            {"id_tag": 3},
                            {"id_tag": 2}
                        ]
                    }
                ]
            }
        ]
    }
 **/



exports.create_New_Menu = async (req, res) => {


  var no_days_is_empty = true
  req.body.calendriers.forEach(calen =>{
    calen.calendrier_recettes.forEach(days=>{
      if ((isNaN(days.id_recette))&& days.is_recette){
        no_days_is_empty = false

      }
    })
  })

  moment.locale('fr')
  if (no_days_is_empty){
  await Menu.create({
    periode_debut: moment(req.body.periode_debut, "DD/MM/YYYY"),
    periode_fin: moment(req.body.periode_fin, "DD/MM/YYYY"),
    id_famille: req.body.id_famille,
    plat_identique_matin: req.body.plat_identique_matin,
    plat_identique_midi: req.body.plat_identique_midi,
    plat_identique_soir: req.body.plat_identique_soir,
    days_until_suggestion: req.body.days_until_suggestion,
    type: req.body.type,
    verrou: req.body.verrou

  }).then(async (data) => {
    const id_new_menu = data.id_menu
    //req.body.calendriers.forEach(cal => {
    await asyncForEach(req.body.calendriers, async (cal) => {

      await db.calendrier.create({
        date: moment(cal.date, "DD/MM/YYYY")


      }).then(async (data) => {

        const id_new_calendar = data.id_calendrier
        await db.menu_calendrier.create({
          id_menu: id_new_menu,
          id_calendrier: id_new_calendar
        })
        //cal.calendrier_recettes.forEach(per => {
        await asyncForEach(cal.calendrier_recettes, async (per) => {

          await db.calendrier_recette.create({

            id_calendrier: id_new_calendar,
            id_recette: per.id_recette,
            periode: per.periode,
            is_recette: per.is_recette,
            nb_personne: per.nb_personne,
            suggestions: []

          }).then(async (data) => {
            const id_periode = data.id_periode
            //per.tag.forEach(tag_index => {
            await asyncForEach(per.tags, async (tag_index) => {

              await db.tag_periode.create({
                id_periode: id_periode,
                id_tag: tag_index.id_tag
              }).catch(err => {
                console.log('erreur insert tag')
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while retrieving locked Menus."
                })
              })

            })

          }).catch(err => {
            console.log('erreur insertcal rec')
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving locked Menus."
            })
          })

        })
      }).catch(err => {
        console.log('erreur insert cal')
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locked Menus."
        })
      })


    })
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving locked Menus."
    })
  })}
}


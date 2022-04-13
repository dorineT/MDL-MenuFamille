const { response } = require("express");
const { calendrier, recette, sequelize, famille } = require("../models");
const db = require("../models");
const Menu = db.menu;
const Op = db.Sequelize.Op;

const moment = require('moment')

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

exports.UpdateMenu = (req, res) => {
  const id = req.params.id;
    Menu.update(req.body, {
      where: {id_menu: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Menu was Updated"
        });
      } else{
        res.send({
          message: `Cannot update Menu with id=${id}`
        })
      }
    })
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
      where: {id_menu: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Menu was Deleted"
        });
      } else{
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

exports.Get_Menu_All_Info_PK = (req, res) =>{
  const id_menu = req.params.id;
  Menu.findByPk(id_menu, {
      include: [
        {
          model: db.calendrier,           
          include:[
            {
              model: db.calendrier_recette,              
              include: [
              {
                model: db.recette, 
                required: false,
                attributes:['nom'],
                include:
                {
                  model: db.tag, required: false, through: {attributes: []}
                }
              },
              {
                model: db.suggestion, 
                required: false,               
                include: [
                  {
                    model: db.membres
                  },
                  {                    
                    model: db.recette, required: false, attributes:['nom'],
                    include:
                    {
                      model: db.tag, required: false, through: {attributes: []}
                    }
                  }
                ]
              },
              {
                model: db.tag, required : false, through: {attributes: []}
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
    where :
    {
      id_famille: id_fam,
      verrou: true,
      periode_fin: {[Op.gte]: date}
    },
    include: [ 
      {
        model: db.calendrier,
        include: [
          {
            model: db.calendrier_recette,
            include: {model: db.recette, required: false, attributes: ['nom']}
          }
        ]
      }
    ],
    order: [
      [db.calendrier, 'date', 'ASC'],
      [db.calendrier, db.calendrier_recette, 'id_periode', 'ASC']
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
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        verrou: false,
        type: 'suggestion',
        periode_fin: {[Op.gte]: moment().subtract(this.days_until_suggestion, 'days').format()},
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


//// Envoyer les menus non vérrouillés  /!\ ne pas tester, pas de Islocked dans la BDD.

exports.Get_Unlocked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  let menus = [];
  Menu.findAll({
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        verrou: false,
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


//verifier avec le nb de jour untils_days_suggestion pour l'envoi des periodes de suggestion
exports.Get_suggest_periode = (req, res) => {
  const id_fam = req.params.id_fam;
  const date = Date.now();

  db.menu.findAll({
    where :
        {
          id_famille: id_fam,
          verrou: false,
          periode_fin: {[Op.gte]: moment().subtract(this.days_until_suggestion, 'days').format()},
        },
    include: [
      {
        model: db.calendrier,
        include: [
          {
            model: db.calendrier_recette,
            include: {model: db.recette, required: false, attributes: ['nom']}
          }
        ]
      }
    ],
    order: [
      [db.calendrier, 'date', 'ASC'],
      [db.calendrier, db.calendrier_recette, 'id_periode', 'ASC']
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
 * @param res
 */




exports.create_New_Menu = (req,res) => {
  console.log("hello")
  console.log(req.body)
  Menu.create({
    periode_debut: moment(req.body.periode_debut,"DD/MM/YYYY") ,
    periode_fin: moment(req.body.periode_fin,"DD/MM/YYYY"),

    id_famille: req.body.id_famille,
    plat_identique_matin: req.body.plat_identique_matin,
    plat_identique_midi: req.body.plat_identique_midi,
    plat_identique_soir: req.body.plat_identique_soir,
    days_until_suggestion: req.body.days_until_suggestion,
    type : req.body.type,
    verrou : req.body.verrou

  }).then(data => {
    console.log('coucou  data')
      const id_new_menu = data.id_menu
      req.body.calendriers.forEach(cal => {
        console.log('coucou 66')

          db.calendrier.create({
              date: moment(cal.date,"DD/MM/YYYY")


          }).then(data => {
            console.log('coucou')
              const id_new_calendar = data.id_calendrier
              db.menu_calendrier.create({
                  id_menu: id_new_menu,
                  id_calendrier: id_new_calendar
              })
              cal.calendrier_recettes.forEach(per => {
                console.log('coucou 2')

                  db.calendrier_recette.create({

                      id_calendrier: id_new_calendar,
                      id_recette: per.id_recette,
                      periode: per.periode,
                      is_recette: per.is_recette,
                      nb_personne: per.nb_personne,
                      suggestions: []
                  }).then(data => {
                    console.log('coucou  3')
                      const id_periode = data.id_periode
                      per.tags.forEach(tag_index => {
                          console.log(tag_index)

                          db.tag_periode.create({
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
  })
}


const db = require("../models");
const CalendrierRecette = db.calendrier_recette;
const Op = db.Sequelize.Op;

/// getCalendrierRecette Simple for CRUD

exports.findAll = (req, res) => {
    CalendrierRecette.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recipe/calender."
      });
    });  
};


/// Put CRUD

  exports.PutCalender_Recipe = (req, res) => {
    CalendrierRecette.create({id_calendrier: req.body.id_calendrier, id_recette: req.body.id_recette, periode: req.body.periode})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||"Some error occurred while putting Recipe.calender"
      });
    });
  };

  //// Update CRUD
exports.UpdateCalender_Recipe = (req, res) => {
  const id_periode = req.params.id_periode;

  CalendrierRecette.update(req.body, {
    where: { [Op.add]: 
        {id_calendrier: id_calendrier,
         id_recette: id_recette}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Calender_Recipe was updated"
      });
    } else{
      res.send({
        message: `Cannot update Calender_Recipe with id_calendrier =${id_calendrier} && id_recette=${id_recipe}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Calender_Recipe with id_calendrier=${id_calendrier} && id_recette=${id_recette}`
      });
  });
};


/// Delete CRUD

exports.DeletCalender_Recipe = (req, res) => {
  const id_calendrier = req.params.id_calendrier;
  const id_recette = req.params.id_recette;
  CalendrierRecette.destroy({
    where: { [Op.add]: 
        {id_calendrier: id_calendrier,
         id_recette: id_recette}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Calender_Recipe was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Calender_Recipe with id_calendrier =${id_calendrier} && id_recette=${id_recipe}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Calender_Recipe with id_calendrier=${id_calendrier} && id_recette=${id_recette}`
      });
  });
};

exports.Get_periode_withTag = (req, res) =>{
    const id_periode = req.params.id;
    CalendrierRecette.findByPk(id_periode,{
        include:[
            {
                model : db.tag,

                through: {attributes: ["id_periode", "id_tag"]}
            }
        ]
    }).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Menus."
        });
    });
};



/**
 *
 * @param req
 * @param res
 * @sample
 * {
    "id_periode": 3,
    "id_calendrier": 1,
    "id_recette": null,
    "periode": "soir",
    "is_recette": true,
    "nb_personne": 1,
    "tag_periode": [
        {
             "id_tag": 5
        },
        {
            "id_tag" : 6
}
    ]
}
 */
exports.Update_Periode_with_Tag = (req, res) => {
  const id = req.params.id;

    var message = ""
  const data = {
    id_periode:  req.body.id_periode ,
    id_calendrier: req.body.id_calendrier ,
    id_recette: req.body.id_recette ,
    periode: req.body.periode ,
    is_recette: req.body.is_recette ,
    nb_personne: req.body.nb_personne }


      ///////
      CalendrierRecette.update(data, {
    where: {
      id_periode: id
    }

  }).then(num =>{
          if (num == 1) {

              message = message + `calendar update`

          }else{
              message = message + `Cannot delete Calender_Recipe with id_periode = ${id} `
          }
      }).catch(err => {

          message = message +
                  err.message || `Cannot delete Calender_Recipe with id_periode = ${id}`

      });
        ////////sup

            db.tag_periode.destroy({
          where: {
            id_periode: id
          }
        }).then(num =>{
                if (num == 1) {

                    message = message + `tag_periode destroy `

                }else   {
                    message = message + `Cannot delete Calender_Recipe with id_periode = ${id} `
                }
            }).catch(err => {
                message = message +
                        err.message || `Cannot delete Calender_Recipe with id_periode = ${id}`

            });
            console.log(req.body["tag_periode"])
////recréa
    req.body["tag_periode"].forEach(element =>
        db.tag_periode.create({id_tag: element.id_tag,id_periode : id}).then(num =>{
            if (num == 1) {
                message = message + `tag_periode update `

            }
            else{
                message = message + `Cannot delete Calender_Recipe with id_periode = ${id} `
            }
        }).catch(err => {

                message = message +
                    err.message || `Cannot delete Calender_Recipe with id_periode = ${id}`


        }))

    if (message == ""){
        message = "Calender_Recipe was updated"
    }

    res.send({
        message: message
    })



};
/**
 *
 * @param req
 * @param res
 * @constructor
 * @return
 * {
    "id_periode": 4,
    "id_calendrier": 2,
    "id_recette": null,
    "periode": "matin",
    "is_recette": true,
    "nb_personne": 1,
    "suggestions": [
        {
            "id_periode": 4,
            "id_recette": 102,
            "id_membre": 8,
            "id_menu": 4,
            "membre": {
                "nom": "dev",
                "prenom": "dev",
                "recettes": [
                    {
                        "nom": "Frite",
                        "favoris": {
                            "id_recette": 102,
                            "id_membre": 8
                        }
                    }
                ]
            }
        }
    ]
}
 */
exports.Get_sugget = (req, res) => {
    const id = req.params.id;
    CalendrierRecette.findByPk(id,{

        include :[
            {

                model: db.suggestion,

                include:[
                    {
                        model : db.membres,
                        attributes: ["nom","prenom"],
                        include:[
                            {
                                model : db.recette,
                                attributes: ["nom"]
                            }
                        ]
                    }

                ]

            }

        ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Menus."
        });
    });



}
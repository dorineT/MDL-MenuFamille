const { response } = require("express");
const { calendrier, recette, sequelize } = require("../models");
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
                model: db.suggestion, required: false,
                include: 
                {
                  model: db.recette, required: false, attributes:['nom'],
                  include:
                  {
                    model: db.tag, required: false, through: {attributes: []}
                  }
                }
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
  let menus = []
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
    ]
  })
  .then(response => {

      res.send(response)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving locked Menus."
    });
  });  
};

/**
 * Obtenir le jour de la semaine en fonction d'un date donnee
 */
function getDay(date){
  let dateJour = moment(date, "DD-MM-YYYY");
  return dateJour.locale('fr').format('dddd')
}


//// Envoyer les menus non-verrouilles + suggestion ouverte 

exports.Get_Manual_Unlocked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  let menus = [];
  Menu.findAll({
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        verrou: false,
        type: 'manuel'
      } 
    }
})
.then(response => {

  //traitement des donnees avant de les envoyer
  //sinon trop lent dans le front
  response.forEach(menuItem => {
    let i = 0
    menus.push({
      menu_id: menuItem.id_menu,
      dateDebut: menuItem.periode_debut,
      dateFin: menuItem.periode_fin,
      verrou: menuItem.verrou,
      plats:[]
    })

    res.send(menus);      
});
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

    //traitement des donnees avant de les envoyer
    //sinon trop lent dans le front
    response.forEach(menuItem => {
      let i = 0
      menus.push({
        menu_id: menuItem.id_menu,
        dateDebut: menuItem.periode_debut,
        dateFin: menuItem.periode_fin,
        verrou: menuItem.verrou,
        plats:[]
      })
    })
      res.send(menus); 
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

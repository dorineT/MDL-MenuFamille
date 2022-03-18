const { calendrier, recette } = require("../models");
const db = require("../models");
const Menu = db.menu;
const Calendrier = db.calendrier;
const Recette = db.recette;
const Tag = db.tag;
const Categorie = db.categorie;
const Denree = db.denree;
const Op = db.Sequelize.Op;

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
    Menu.create ({id_famille: req.body.id_famille, periode_debut: req.body.periode_debut, periode_fin: req.body.periode_fin, plat_identique: req.body.plat_identique, type: req.body.type})
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while insering in Menu"
      });
    });
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

///GetMenuAllInfo

exports.Get_Menu_All_Info_PK = (req, res) =>{
  const id_menu = req.params.id;
  Menu.findByPk(id_menu,{ 
                          include: [
                            {model: Calendrier, through: {attributes: []}, 
                                include: [{model: Recette, through: {attributes: ["periode"]}, attributes:['nom']}]
                          }]
                        })
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
    ]
  })
  .then(menuGlobal => {
    res.send(menuGlobal);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving locked Menus."
    });
  });  
};


//// Envoyer les menus non-verrouilles + suggestion ouverte 

exports.Get_Manual_Unlocked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  Menu.findAll({
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        verrou: false,
        type: 'manuel'
      } 
    }
  }, {include:{model: "calendrier"}}, {include:{ model: "recette", attributes: ['nom']}})
  .then(data => {
    res.send(data);
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
  Menu.findAll({
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        verrou: false,
      } 
    }
  }, {include:{model: "calendrier"}}, {include:{ model: "recette", attributes: ['nom']}})
  .then(data => {
    res.send(data);
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

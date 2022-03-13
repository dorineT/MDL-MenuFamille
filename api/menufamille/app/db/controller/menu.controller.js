const { calendrier, recette } = require("../models");
const db = require("../models");
const Menu = db.menu;
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


/*
//// envoyer toutes les données concernant un menu (calendrier, plats, recettes, tag, propositions de recettes) carte #44
//// On a pas de lien entre Menu et tag,

exports.Get_Menu_All_Info_PK = (req, res) =>{
  const id_menu = req.params.id;
  Menu.findByPk(id_menu, { include:  {all: true, nested: true}}) // Sinon tester { include: calendrier, recette} où {include: calendrier { include: calendrier_recette { include: recette { include: recette_tag {include: tag}, recette_categorie {include: categorie}}}}}
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
*/


///// envoyer les menus verrouillés dont la date n'est pas passée (pas des menus qui datent de 2 semaines) /!\ ne pas tester, pas de Islocked dans la BD. carte #34


exports.Get_Current_Locked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  const date = Date.now();
  Menu.findAll({
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        est_verrouille: true,
        periode_fin: 
        {
            [Op.lt]: date /// Lower than 
        }
      } 
    }
  }, {include:{model: "calendrier"}}, {include:{ model: "recette", attributes: ['nom']}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving locked Menus."
    });
  });  
};


//// Envoyer les menus non-verrouilles + suggestion ouverte.

exports.Get_Manual_Unlocked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  Menu.findAll({
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        est_verrouille: false,
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


//// Envoyer les menus non vérrouillés

exports.Get_Unlocked_Menu = (req, res) => {
  const id_fam = req.params.id_fam;
  Menu.findAll({
    where : { [Op.and]: 
      {
        id_famille: id_fam,
        est_verrouille: false,
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
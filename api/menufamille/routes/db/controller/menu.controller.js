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

exports.UpdateMenu = (req, res) => {
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
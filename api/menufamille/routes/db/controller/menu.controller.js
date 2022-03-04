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
    const new_menu = await Menu.create ({id_famille: req[0], periode_debut: req[1], periode_fin: req[2], plat_identique: req[3], plat_identique: req[4], type: req[5]})
    .then(res.send(new_menu.id_menu))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while insering in Menu"
      });
    });
  };

/// Update CRUD

exports.UpdateMenu = (req, res) => {
  let new_menu = Menu.findByPk(req[0]);

  new_menu.set({
      id_famille: req[1],
      periode_debut: req[2],
      periode_fin: req[3],
      plat_identique: req[4],
      type: req[5]
  });

  await new_menu.save()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while updating Menu"
      });
  });
};


/// Delete CRUD 

exports.DeleteMenu = (req, res) => {
  let menu_to_destroy = Menu.findByPk(req[0]);

  await menu_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Menu"
      });
  });
};

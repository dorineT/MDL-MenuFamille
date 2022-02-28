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

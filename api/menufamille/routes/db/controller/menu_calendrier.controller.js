const db = require("../models");
const MenuCalendrier = db.menu_calendrier;
const Op = db.Sequelize.Op;

// Retrieve all Menu_Calender from the database.
exports.findAll = (req, res) => {
    MenuCalendrier.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menu_Calender."
      });
    });  
};

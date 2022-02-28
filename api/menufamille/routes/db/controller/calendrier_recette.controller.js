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

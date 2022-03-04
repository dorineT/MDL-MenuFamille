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


/// PUT CRUD

exports.PutMenu_Calender = (req, res) => {
  const new_men_cal = await MenuCalendrier.create({id_menu: req[0], id_calendrier: req[1]})
  .then(res.send(new_men_cal))
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Menu/Cal"
    });
  });
};


/// UPDATE CRUD

/// FAUT EN PARLER


/// DELETE CRUD

exports.Delete_Menu_Calender = (req, res) => {
  let menu_cal_to_destroy = MenuCalendrier.findAll({
      where: {
        [Op.add]: [
              id_menu = req[0],
              id_calendrier = req[1]
            ]
      }
  });

  await menu_cal_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Menu/Cal"
      });
  });
};
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

exports.Put_Menu_Calender = (req, res) => {
  MenuCalendrier.create({id_menu: req.body.id_menu, id_calendrier: req.body.id_calendrier})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Menu/Cal"
    });
  });
};


/// UPDATE CRUD

exports.Update_Menu_Calender = (req, res) => {
  const id_menu = req.params.id_menu;
  const id_calendrier = req.params.id_calendrier;
  MenuCalendrier.update(req.body, {
    where: { [Op.add]: 
        {id_menu: id_menu,
         id_calendrier: id_calendrier}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Menu_Calender was updated"
      });
    } else{
      res.send({
        message: `Cannot update Menu_Calender with id_menu=${id_menu} && id_calendrier=${id_calendrier}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Menu_Calender with id_menu=${id_menu} && id_calendrier=${id_calendrier}`
      });
  });
};


/// DELETE CRUD

exports.Delete_Menu_Calender = (req, res) => {
  const id_menu = req.params.id_menu;
  const id_calendrier = req.params.id_calendrier;
  MenuCalendrier.destroy({
    where: { [Op.add]: 
        {id_menu: id_menu,
         id_calendrier: id_calendrier}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Menu_Calender was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Menu_Calender with id_menu=${id_menu} && id_calendrier=${id_calendrier}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Menu_Calender with id_menu=${id_menu} && id_calendrier=${id_calendrier}`
      });
  });
};
const db = require("../models");
const categorieModels = require("../models/categorie.models");
const Calendrier = db.calendrier;
const Op = db.Sequelize.Op;

/// GetAllCalendrier Simple for CRUD

exports.findAll = (req, res) => {
    Calendrier.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Calenders."
      });
    });  
};


// Put CRUD

exports.PutCalender = (req, res) => {
  Calendrier.create({ date: req.body.date, nb_personne: req.body.nb_personne})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting Calenders"
    });
  });
};

// Update CRUD

exports.UpdateCalender = (req, res) => {
    const id = req.params.id;
    Calendrier.update(req.body, {
      where: {id_calendrier: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Calender was Updated"
        });
      } else{
        res.send({
          message: `Cannot update Calender with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while updating Calenders id=${id}`
        });
    });
  };


  // Delete CRUD

  exports.DeleteCalender = (req, res) => {
    const id = req.params.id;
    Calendrier.destroy({
      where: {id_calendrier: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Calender was deleted"
        });
      } else{
        res.send({
          message: `Cannot delete Calender with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while deleting Calenders id=${id}`
        });
    });
  };
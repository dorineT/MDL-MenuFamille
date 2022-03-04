const db = require("../models");
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
  const new_calenders = await Calendrier.create({ date: req[0], nb_personne: req[1]})
  .then(res.send(new_calenders.id_menu))
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting Calenders"
    });
  });
};

// Update CRUD

exports.UpdateCalender = (req, res) => {
  let new_calenders = await Calendrier.findByPk(req[0]);

  new_calenders.set({
      date: req[1],
      nb_personne: req[2]
  });

  await new_calenders.save()
    .then(res.send(true))
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating Calenders"
        });
    });
  };


  // Delete CRUD

  exports.DeleteCalender = (req, res) => {
    let calender_to_destroy = Calendrier.findByPk(req[0]);

    await calender_to_destroy.destroy()
    .then(res.send(true))
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while deleting Calenders"
        });
    });
  };
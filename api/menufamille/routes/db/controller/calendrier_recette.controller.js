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


/// Put CRUD

  exports.PutCalender_Recipe = (req, res) => {
    const new_cal_rec = await CalendrierRecette.create({id_calendrier: req[0], id_recette: req[1], periode: req[2]})
    .then(res.send(new_cal_rec))
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||"Some error occurred while putting Recipe.calender"
      });
    });
  };

  //// Update CRUD
exports.UpdateCalender_Recipe = (req, res) => {
  let new_cal_rec = CalendrierRecette.findAll({
    where: {
      [Op.add]: [
            id_calendrier = req[0],
            periode = req[1]
          ]
    }
});

  new_cal_rec.set({
      id_recette: req[2]
  });

  await new_cal_rec.save()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while updating cal/rec"
      });
  });
};


/// Delete CRUD

exports.DeletCalender_Recipe = (req, res) => {
  let cal_rec_to_destroy = CalendrierRecette.findAll({
      where: {
        [Op.add]: [
              id_calendrier = req[0],
              periode = req[1]
            ]
      }
  });

  await cal_rec_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting cal/rec"
      });
  });
};



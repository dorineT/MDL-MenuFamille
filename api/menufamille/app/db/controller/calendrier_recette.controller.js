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
    CalendrierRecette.create({id_calendrier: req.body.id_calendrier, id_recette: req.body.id_recette, periode: req.body.periode})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||"Some error occurred while putting Recipe.calender"
      });
    });
  };

  //// Update CRUD
exports.UpdateCalender_Recipe = (req, res) => {
  const id_calendrier = req.params.id_calendrier;
  const id_recette = req.params.id_recette;
  CalendrierRecette.update(req.body, {
    where: { [Op.add]: 
        {id_calendrier: id_calendrier,
         id_recette: id_recette}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Calender_Recipe was updated"
      });
    } else{
      res.send({
        message: `Cannot update Calender_Recipe with id_calendrier =${id_calendrier} && id_recette=${id_recipe}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Calender_Recipe with id_calendrier=${id_calendrier} && id_recette=${id_recette}`
      });
  });
};


/// Delete CRUD

exports.DeletCalender_Recipe = (req, res) => {
  const id_calendrier = req.params.id_calendrier;
  const id_recette = req.params.id_recette;
  CalendrierRecette.destroy({
    where: { [Op.add]: 
        {id_calendrier: id_calendrier,
         id_recette: id_recette}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Calender_Recipe was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Calender_Recipe with id_calendrier =${id_calendrier} && id_recette=${id_recipe}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Calender_Recipe with id_calendrier=${id_calendrier} && id_recette=${id_recette}`
      });
  });
};

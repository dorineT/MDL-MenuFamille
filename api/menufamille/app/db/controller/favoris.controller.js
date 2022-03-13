const db = require("../models");
const Favoris = db.favoris;
const Op = db.Sequelize.Op;

// Retrieve all favorite from the database.
exports.findAll = (req, res) => {
    Favoris.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving favorite."
      });
    });  
};


/// Put CRUD

exports.PutFavorite = (req, res) => {
  Favoris.create({id_recette: req.body.id_recette, id_membre: req.body.id_membre})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Favoris"
    });
  });
};


//// Update CRUD

exports.Update_Favoris = (req, res) => {
  const id_recette = req.params.id_recette;
  const id_membre = req.params.id_membre;
  MenuCalendrier.update(req.body, {
    where: { [Op.add]: 
        {id_recette: id_recette,
         id_membre: id_membre}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Favoris was updated"
      });
    } else{
      res.send({
        message: `Cannot update Favoris with id_recette=${id_recette} && id_membre=${id_membre}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Favoris with id_recette=${id_recette} && id_membre=${id_membre}`
      });
  });
};


/// Delete CRUD 


exports.DeletCalender_Recipe = (req, res) => {
  const id_recette = req.params.id_recette;
  const id_membre = req.params.id_membre;
  MenuCalendrier.destroy({
    where: { [Op.add]: 
        {id_recette: id_recette,
         id_membre: id_membre}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Favoris was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Favoris with id_recette=${id_recette} && id_membre=${id_membre}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Favoris with id_recette=${id_recette} && id_membre=${id_membre}`
      });
  });
};
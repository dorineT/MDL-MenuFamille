const db = require("../models");
const Favoris = db.favoris;
const Op = db.Sequelize.Op;

// Retrieve all favorite from the database.
exports.findAll = (req, res) => {
    Favoris.findAll({
      where:{
        id_membre: req.id_membre
      }
    })
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


exports.find = (req, res) => {
  Favoris.findOne({
    where:{
      id_membre: req.id_membre,
      id_recette: req.params.id_recette
    }
  })
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
  Favoris.create({id_recette: req.body.id_recette, id_membre: req.id_membre})
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




/// Delete CRUD 


exports.DeleteFavoris = (req, res) => {
  const id_recette = req.params.id_recette;
  const id_membre = req.id_membre;
  Favoris.destroy({
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
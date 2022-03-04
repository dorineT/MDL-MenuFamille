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
  const new_fav = await Favoris.create({id_recette: req[0], id_membre: req[1]})
  .then(res.send(new_fav))
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Favoris"
    });
  });
};


//// Update CRUD

/// Faut en parler


/// Delete CRUD 


exports.DeletCalender_Recipe = (req, res) => {
  let fav_to_destroy = Favoris.findAll({
      where: {
        [Op.add]: [
              id_recette = req[0],
              id_membre = req[1]
            ]
      }
  });

  await fav_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Fav"
      });
  });
};
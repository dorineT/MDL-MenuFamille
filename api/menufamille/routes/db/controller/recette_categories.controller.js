const db = require("../models");
const RecetteCategorie = db.recette_categories;
const Op = db.Sequelize.Op;

// Retrieve all Recette_categories from the database.
exports.findAll = (req, res) => {
    RecetteCategorie.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_categories."
      });
    });  
};



/// PUT CRUD

exports.Put_Recipe_Category = (req, res) => {
  const new_rec_cat = await RecetteCategorie.create({id_recette: req[0], id_category: req[1]})
  .then(res.send(new_rec_cat))
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Rec/Cate"
    });
  });
};


/// UPDATE CRUD

/// FAUT EN PARLER


/// DELETE CRUD

exports.Delete_Recipe_Category = (req, res) => {
  let rec_cat_to_destroy = RecetteCategorie.findAll({
      where: {
        [Op.add]: [
              id_recette = req[0],
              id_category = req[1]
            ]
      }
  });

  await rec_cat_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Rec/Cate"
      });
  });
};
const db = require("../models");
const RecetteDenree = db.recette_denree;
const Op = db.Sequelize.Op;

// Retrieve all Recette_denree from the database.
exports.findAll = (req, res) => {
    RecetteDenree.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recette_denree."
      });
    });  
};


/// PUT CRUD

exports.PutRecipe_Denree = (req, res) => {
  const new_rec_den = await RecetteDenree.create({id_recette: req[0], id_Denree: req[1], quantite: req[2]})
  .then(res.send(new_rec_den))
  .catch(err => {
    res.status(500).send({
      message:
        err.message ||"Some error occurred while putting Recipe/denree"
    });
  });
};


  //// Update CRUD
  exports.UpdateRecipe_Denree = (req, res) => {
    let new_rec_den = RecetteDenree.findAll({
      where: {
        [Op.add]: [
              id_recette = req[0],
              id.denree = req[1]
            ]
      }
  });
  
    new_rec_den.set({
        qunatite: req[2]
    });
  
    await new_rec_den.save()
    .then(res.send(true))
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating Recipe/denree"
        });
    });
  };
  


/// DELETE CRUD

exports.Delete_Recipe_Denree = (req, res) => {
  let rec_den_to_destroy = RecetteDenree.findAll({
     where: {
       [Op.add]: [
              id_recette = req[0],
              id.denree = req[1]
           ]
      }
  }); 

  await rec_den_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Recipe/denree"
      });
  });
};
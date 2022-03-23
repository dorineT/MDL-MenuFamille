const db = require("../models");
const Tag = db.tag;
const Op = db.Sequelize.Op;

// Retrieve all Tag from the database.
exports.findAll = (req, res) => {
    Tag.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tag."
      });
    });  
};



//un controleur par table
// pour les jointures, utiliser le include


/// Put CRUD

exports.PutTag = (req, res) => {
  Tag.create({nom: req.body.nom})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || "Some error occurred while inserting tag"
      });
  });
};


/// Update CRUD 

exports.UpdateTag = (req, res) => {
  const id = req.params.id;
  Tag.update(req.body, {
    where: {id_tag: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Tag was Updated"
      });
    } else{
      res.send({
        message: `Cannot update tag with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Tag id=${id}`
      });
  });
};


/// delete CRUD 

exports.Deletetag = (req, res) => {
  const id = req.params.id;
  Tag.destroy({
    where: {id_tag: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Tag was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete tag with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Tag id=${id}`
      });
  });
};

/**
 * @overview : renvoie la liste des plats contenant ce tag
 * @param req
 * @param res
 * @constructor
 * @return : {tag [liste recette]}
 */
exports.TagRecette = (req,res) => {
    const id_tag = req.params.id;
    Tag.findByPk(id_tag,{
        include :[
            {

                model: db.recette,
                required: false,
                through: {attributes: []},

            }

        ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Menus."
        });
    });
};
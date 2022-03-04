const db = require("../models");
const FamilleMembre = db.famille_membre;
const Op = db.Sequelize.Op;

// Retrieve all famille_membre from the database.
exports.findAll = (req, res) => {
    FamilleMembre.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving famille_membre."
      });
    });  
};


// PUT CRUD
exports.PutFamillyMember = (req, res) => {
  const new_fam_mem = await FamilleMembre.create({id_famille: req[0], id_membre: req[1]})
  .then(res.send([new_fam_mem.id_famille, new_fam_mem.id_membre]))
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while instering Familly/member"
    });
  });
};


/// UPDATE CRUD 

  /// JE DOIS EN PARLER 


/// DELETE CRUD 

exports.DeleteFamillyMember = (req, res) => {
  let fam_mem_to_destroy = DenreeType.findAll({
    where: {
      [Op.add]: [
            id_famille = req[0],
            id_member = req[1]
          ]
      }
  });


  await fam_mem_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting  Familly/member"
    });
  });
};
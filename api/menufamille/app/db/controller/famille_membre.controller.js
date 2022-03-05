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
  FamilleMembre.create({id_famille: req.body.id_famille, id_membre: req.body.id_membre})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while instering Familly/member"
    });
  });
};


/// UPDATE CRUD 

exports.Update_Familly_Member  = (req, res) => {
  const id_famille = req.params.id_famille;
  const id_membre = req.params.id_membre;
  MenuCalendrier.update(req.body, {
    where: { [Op.add]: 
        {id_famille: id_famille,
         id_membre: id_membre}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Familly_Member was updated"
      });
    } else{
      res.send({
        message: `Cannot update Familly_Member with id_famille=${id_famille} && id_membre=${id_membre}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Familly_Member with id_famille=${id_famille} && id_membre=${id_membre}`
      });
  });
};


/// DELETE CRUD 

exports.DeleteFamillyMember = (req, res) => {
  const id_famille = req.params.id_famille;
  const id_membre = req.params.id_membre;
  MenuCalendrier.destroy({
    where: { [Op.add]: 
        {id_famille: id_famille,
         id_membre: id_membre}
    }
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Familly_Member was deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Familly_Member with id_famille=${id_famille} && id_membre=${id_membre}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Familly_Member with id_famille=${id_famille} && id_membre=${id_membre}`
      });
  });
};

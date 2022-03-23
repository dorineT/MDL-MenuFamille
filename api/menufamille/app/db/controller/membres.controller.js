const db = require("../models");
const Membres = db.membres;
const Op = db.Sequelize.Op;

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    Membres.findAll( ['id_membre', "nom", "prenom", "email"] )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving members."
      });
    });  
};

/// Put CRUD

exports.PutMember = (req, res) => {
  Membres.create({id_token: req.body.id_token, nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, secret: req.body.secret})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting Member"
      });
  });
};

/// Update CRUD

exports.UpdateMember = (req, res) => {
  const id = req.params.id;
  Membres.update(req.body, {
    where: {id_membre: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Members was Updated"
      });
    } else{
      res.send({
        message: `Cannot update Members with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating Members id=${id}`
      });
  });
};


/// Delete CRUD

exports.DeleteMember = (req, res) => {
  const id = req.params.id;
  Membres.destroy({
    where: {id_membre: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Members was Deleted"
      });
    } else{
      res.send({
        message: `Cannot delete Members with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Members id=${id}`
      });
  });
};



/// GetListMembre

exports.GetListMembre = (req, res) =>{
  const id_fam = req.params.id;
   Membres.findAll({
     where :{
       '$familles.id_famille$': id_fam
     },
     attributes: ['id_membre', "nom", "prenom", "email"],
     include :[{
       model: db.famille,
       as: 'familles',
       attributes : [],
     }]
   }
   ).then(data => { 
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while getting Membres"
     });
   });
 };
 

 /// Rejoindre une famille

 exports.JoinFamilly = (req, res) => {
   const id_fam = req.params.id_fam;
   const id_mem = req.params.id_mem;
   const role_req = req.body.role;
   if (role_req == "parent" || role_req == "enfant"){
    db.famille_membre.create({id_famille: id_fam, id_membre: id_mem, role: role})
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while joining a familly"
      });
    });
   } else {
    res.send({
      message: "Bad request, role must be 'parent' or 'enfant'" 
    });
  }
 }

/// Quitter une famille 

exports.LeaveFamilly = (req, res) => {
  const id_fam = req.params.id_fam;
  const id_mem = req.params.id_mem;
  db.famille_membre.destroy({
    where: 
    { [Op.add]: 
      {
        id_famille: id_fam,
        id_membre: id_mem
      }
    } 
  }).then(num =>{
    if (num == 1) {
      res.send({
        message: `You left the familly with the ID ${id_fam}`
      });
    } else{
      res.send({
        message: `You cannot leave the familly with the ID ${id_fam}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while Leaving Familly_Member with id_famille=${id_fam}`
      });
  }); 
}
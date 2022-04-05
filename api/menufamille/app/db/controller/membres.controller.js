const db = require("../models");
var bcrypt = require("bcryptjs");
const Membres = db.membres;
const Family = db.famille;
const Op = db.Sequelize.Op;

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    Membres.findAll( {attributes: ['id_membre', "nom", "prenom", "email"]})
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
  let data;
  if(req.body.password) {
    data = {secret: bcrypt.hashSync(req.body.newPassword, 8)};
  } else {
    data = {prenom: req.body.firstname, nom: req.body.lastname};
  }
  Membres.update(data, {
    where: {id_membre: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Members was Updated"
      });
    } else{
      res.status(401).send({
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
 


/// Quitter une famille 

exports.LeaveFamilly = (req, res) => {
  const id_fam = req.params.id_fam;
  const id_mem = req.params.id_mem;
  db.famille_membre.destroy({
    where: 
    { [Op.and]: 
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
      res.status(403).send({
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

// remove notif
exports.removeNotif = (req, res) => {
  const id_fam = req.params.id_famille;
  const id_mem = req.id_membre;
  db.famille_membre.destroy({
    where: 
    { [Op.and]: 
      {
        id_famille: id_fam,
        id_membre: id_mem,
        statut: 'refuser'
      }
    } 
  }).then(num =>{
    if (num == 1) {
      res.send({
        message: `You left the familly with the ID ${id_fam}`
      });
    } else{
      res.status(403).send({
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
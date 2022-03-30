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



/// GetListMembre

exports.GetListMembre = (req, res) =>{
  const id_fam = req.params.id;
   Family.findOne({
     where :{
       'id_famille': id_fam
     },
     attributes: [],
     include: [
     {
      model: db.membres,
      attributes: ["id_membre", "nom","prenom"],
      through : {model: db.famille_membre, as: 'role', attributes: ["role"]}
    }],
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
    res.status(403).send({
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


/// Ajouter un favoris

exports.AddFavorites = (req, res) => {
  const id_mem = req.params.id_mem;
  const id_rec = req.params.id_rec;
  db.favoris.create({id_membre: id_mem, id_recette: id_rec})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding into favorites"
      });
  });
}


/// Retirer un favoris

exports.RemoveFavorites = (req, res) => {
  const id_mem = req.params.id_mem;
  const id_rec = req.params.id_rec;
  db.favoris.destroy({
    where: 
    { [Op.and]: 
      {
        id_membre: id_mem,
        id_recette: id_rec
      }
    } 
  }).then(num =>{
    if (num == 1) {
      res.send({
        message: `You removed the recipe with ID ${id_rec} from your favorites`
      });
    } else{
      res.status(403).send({
        message: `You tried to remove the recipe with ID ${id_rec} from your favorites`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while removing the recipe=${id_rec} from the favorites`
      });
  }); 
}

/// Lister les favoris

exports.ListFavorites = (req, res) =>{
  const id_mem = req.params.id_mem;

  Membres.findOne({
    where :{
      id_membre: id_mem
    },
    attributes: [],
    include: [
    {
     model: db.recette,
     attributes: ["id_recette","nom"],
     through : {model: db.favoris, attributes: []}
   }],
  }).then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while getting Membres"
    });
  });
}
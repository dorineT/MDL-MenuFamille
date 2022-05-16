const db = require("../models");
const ShortUniqueId = require('short-unique-id');
const Famille = db.famille;
const Op = db.Sequelize.Op;

// Retrieve all famille from the database.
exports.findAll = (req, res) => {
    Famille.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving famille."
      });
    });  
};


// Put CRUD 

exports.PutFamilly = (req, res) => {
  Famille.create({ nom: req.body.nom, code_acces: req.body.code_acces, nb_membres: req.body.nb_membres})
  .then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting Familly"
    });
  });
};

// Update CRUD

exports.UpdateFamilly = (req, res) => {
  const id = req.params.id;
  Famille.update(req.body, {
    where: {id_famille: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send({
        message: "Familly was Updated"
      });
    } else{
      res.send({
        message: `Cannot update familly with id=${id}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while updating familly id=${id}`
      });
  });
};


  // Delete CRUD

  exports.DeleteFamilly = (req, res) => {
    const id = req.params.id_famille;
    Famille.destroy({
      where: {id_famille: id}
    })
    .then(num =>{
      if (num == 1) {
        res.send({
          message: "Familly was Deleted"
        });
      } else{
        res.send({
          message: `Cannot delete familly with id=${id}`
        })
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while deleting familly id=${id}`
        });
    });
  };
  


/// GetListFamilly

exports.GetListFamilly = (req, res) =>{
 const id_mem = req.params.id;
  Famille.findAll({
    where :{
      '$membres.id_membre$': id_mem
    },
    include :[{
      model: db.membres,
      as: 'membres',
      attributes : [],
      through: {attributes: []}
    }]
  }
  ).then(data => { 
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting Familly"
    });
  });
};


/// DeleteMemberFamille

exports.DeleteMemberFamilly = (req, res) => {
  const id_mem = req.params.id_membre;
  const id_fam = req.params.id_famille;
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
        message: `the Familly member with the ID ${id_mem} was deleted from the familly with the ID ${id_fam}`
      });
    } else{
      res.status(403).send({
        message: `Cannot delete the member with the ID ${id_mem} from the familly with the ID ${id_fam}`
      })
    }
  })
  .catch(err => {
      res.status(500).send({
          message:
            err.message || `Some error occurred while deleting Familly_Member with id_famille=${id_fam} && id_membre=${id_mem}`
      });
  });
};

// Définir rôle membres famille

exports.SwitchRole = (req, res) => {
  const id_membre = req.params.id_membre;
  const id_famille = req.params.id_famille;
  const role_req = req.body.role;
  if (role_req == "parent" || role_req == "enfant"){
    db.famille_membre.update( {role: role_req}, {
      where: { [Op.and]: 
          {id_famille: id_famille,
           id_membre: id_membre}
      }
    })
    .then(num =>{
      if (num == 1) {
        res.send(true);
      } else{
        res.send(false);
      }
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || `Some error occurred while updating the role of member ${id_mem} form familly ${id_fam}`
        });
    });
  } else {
    res.send({
      message: "Bad request, role must be 'parent' or 'enfant'" 
    });
  }
};




/// Create familly + add person

exports.CreateFamilly = (req, res) => {
  const id_mem = req.params.id_membre;
  Famille.create({ nom: req.body.nom, nb_membres: req.body.count})
  .then(data => { 

    const id_fam = data.id_famille;

    db.famille_membre.create({id_famille: id_fam, id_membre: id_mem, role: "parent", statut: 'accepter'})
    .then(data2 => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting Familly"
      });
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting Familly"
    });
  });
};





///// Check le code d'accès

exports.CheckAccesCode = (req, res) => {
  const id_famille = req.params.id_famille;
  Famille.findOne(
    {where: 
      {id_famille: id_famille}
  })
  .then(data => {
    if (data == null) {
      res.status(403).send({
        message: `Famille introuvable!`
      })
    }
    else if(data != null) {
      if(data.code_acces == null) {
        const uid = new ShortUniqueId({ dictionary: 'hex' });
        const code = uid.randomUUID(6);
        Famille.update({code_acces: code}, {
          where: {id_famille: id_famille}
        })
        .then(num =>{
          if (num == 1) {
            res.send({
              id_famille: id_famille,
              code: code
            });
          } else{
            res.send({
              message: `Cannot update familly with code=${code}`
            })
          }
        });
      }
      else {
        res.send({
          id_famille: data.id_famille,
          code: data.code_acces
        });
      }
    } else {
      res.status(500).send({
        message:
          err.message || `Some error occurred while search code access`
      });
    }
  })  
};

/// GetListMembre

exports.GetListMembre = (req, res, next) =>{
  const id_fam = req.params.id_famille;
   Famille.findOne({
     where :{
       'id_famille': id_fam,   
     },
     attributes: [],
     include: [
     {
      model: db.membres,
      attributes: ["id_membre", "nom","prenom"],
      through : {model: db.famille_membre, as: 'role', attributes: ["role"], where: {'statut': req.statut}}
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

 // Get list notif
 exports.GetListNotif = (req, res, next) =>{
  const id_membre = req.id_membre;
   Famille.findAll({
     attributes: ['nom', 'id_famille'],
     include: [
     {
      model: db.membres,
      where: {
        id_membre: id_membre
      },
      attributes: [],
      through : {model: db.famille_membre, as: 'role', attributes: [], where: {'statut': 'refuser'}}
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

 exports.Update_Statut_Request  = (req, res) => {
  const id_famille = req.params.id_famille;
  const id_membre = req.params.id_membre;
  const statut = req.statut;
  db.famille_membre.update({statut: statut}, {
    where: { [Op.and]: 
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

 /// Rejoindre une famille

exports.joinFamilly = (req, res) => {
  const id_famille = req.id_famille;
  const id_membre = req.id_membre;
   db.famille_membre.create({id_famille: id_famille, id_membre: id_membre, role: 'enfant', statut: 'attente'})
   .then(data => { 
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         "Vous êtes déjà membre de cette famille!"
     });
   });
};


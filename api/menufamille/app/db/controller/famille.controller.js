const db = require("../models");
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
    const id = req.params.id;
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
  const id_mem = req.params.id_mem;
  const id_fam = req.params.id_fam;
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

exports.DefineRole = (req, res) => {
  const id_mem = req.params.id_mem;
  const id_fam = req.params.id_fam;
  const role_req = req.body.role;
  if (role_req == "parent" || role_req == "enfant"){
    db.famille_membre.update( {role: role_req}, {
      where: { [Op.add]: 
          {id_famille: id_fam,
           id_membre: id_mem}
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
}


/// Parent existe-il ?

exports.PapaOuTes = (req,res) =>{
  const id_fam = req.params.id_fam
  db.famille_membre.findAndCountAll({
    where: { [Op.add]: 
      {id_famille: id_fam,
       role: 'parent'}
      }
  })
  .then(rep => {
    if (rep >= 1){
      res.send(true);
    } else {
      res.send(false);
    }
  })
}



/// Create familly + add person

exports.CreateFamilly = (req, res) => {
  const id_mem = req.params.id_mem;
  Famille.create({ nom: req.body.nom, code_acces: req.body.code_acces, nb_membres: 1})
  .then(data => { 

    const id_fam = data.id_famille;
    console.log(id_fam);

    db.famille_membre.create({id_famille: id_fam, id_membre: id_mem, role: "parent"})
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


//// Lower Member count

exports.LowerMemberCount = (req, res) => {
  const id = req.params.id;
  const nv_membres = req.body.nb_membres - 1;
  Famille.update({
    nb_membres: nv_membres
  },{
    where: {id_famille: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send(nv_membres);
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
}

//// Add Member count
exports.AddMemberCount = (req, res) => {
  const id = req.params.id;
  const nv_membres = req.body.nb_membres + 1;
  Famille.update({
    nb_membres: nv_membres
  },{
    where: {id_famille: id}
  })
  .then(num =>{
    if (num == 1) {
      res.send(nv_membres);
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
}


///// Check le code d'accès

exports.CheckAccesCode = (req, res) => {
  const acces_code = req.params.code;
  Famille.findAll(
    {where: {code_acces: acces_code}
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving famille."
    });
  });  
}
const db = require("../models");
const Membres = db.membres;
const Op = db.Sequelize.Op;

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    Membres.findAll()
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
  const new_member = await Membres.create({id_token: req[0], nom: req[1], prenom: req[2], email: req[3], secret: res[4]})
  .then(res.send(new_member.id_membre))
  .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting Member"
      });
  });
};

/// Update CRUD

exports.UpdateMember = (req, res) => {
  let new_member = Membres.findByPk(req[0]);

  new_member.set({
    id_token: req[1],
    nom: req[2],
    prenom: req[3],
    email: req[4],
    secret: req[5]
  });

  await new_member.save()
  .then(res.send(true))
  .catch(err => res.status(500).send({
    message:
      err.message || "Some error occurred while modifing members."
  }));
};

/// Delete CRUD

exports.DeleteMember = (req, res) => {
  let member_to_destroy = Membres.findByPk(req[0]);

  await member_to_destroy.destroy()
  .then(res.send(true))
  .catch(err => res.status(500).send({
    message:
      err.message || "Some error occurred while delete members."
  }));
}
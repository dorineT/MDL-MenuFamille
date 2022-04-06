const db = require("../models");
var bcrypt = require("bcryptjs");
const Suggestion = db.suggestion;
const Op = db.Sequelize.Op;

// Retrieve all suggestion from the database.
exports.findAll = (req, res) => {
    Suggestion.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

//un controleur par table
// pour les jointures, utiliser le include


/// Post CRUD

exports.put_suggestion = (req, res) => {

    Suggestion.create({
        id_periode: req.body.id_periode,
        id_recette: req.body.id_recette,
        id_membre: req.body.id_membre,
        id_menu: req.body.id_menu

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while inserting type"
            });
        });
};


/// Update CRUD

exports.Update_suggestion = (req, res) => {
    const id_periode = req.params.id_periode;
    const id_recette = req.params.id_recette;
    const id_membre = req.params.id_membre;
    const id_menu = req.params.id_menu;

    Suggestion.update(req.body, {
        where: {
            id_periode: id_periode,
            id_recette: id_recette,
            id_membre: id_membre,
            id_menu: id_menu
        }
    })
        .then(num =>{
            if (num == 1) {
                res.send({
                    message: "Suggestion was Updated"
                });
            } else{
                res.send({
                    message: `Cannot update suggestion  with id_periode =${id_periode} && id_recette =${id_recette} && id_membre =${id_membre} && id_menu =${id_menu} \``
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while updating Suggestion  id_periode =${id_periode} && id_recette =${id_recette} && id_membre =${id_membre} && id_menu =${id_menu} \``
            });
        });
};


/// delete CRUD

exports.Delete_suggestion = (req, res) => {
    const id_periode = req.params.id_periode;
    const id_recette = req.params.id_recette;
    const id_membre = req.params.id_membre;
    const id_menu = req.params.id_menu;
    Suggestion.destroy({
        where: {
            id_periode: id_periode,
            id_recette: id_recette,
            id_membre: id_membre,
            id_menu: id_menu
        }
    })
        .then(num =>{
            if (num == 1) {
                res.send({
                    message: "Suggestion was deleted"
                });
            } else{
                res.send({
                    message: `Cannot delete type with id_periode =${id_periode} && id_recette =${id_recette} && id_membre =${id_membre} && id_menu =${id_menu} `
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while deleting suggestion id_periode =${id_periode} && id_recette =${id_recette} && id_membre =${id_membre} && id_menu =${id_menu} \``
            });
        });
};
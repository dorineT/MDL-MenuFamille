const db = require("../models");
var bcrypt = require("bcryptjs");
const Suggestion = db.suggestion;
const Op = db.Sequelize.Op;

/// Post CRUD

exports.put_suggestion = (req, res) => {
    console.log("create suggestion " + req.body.id_periode+" "+req.body.id_recette +" "+req.body.id_menu + " "+ req.id_membre)
    
    Suggestion.create({
        id_periode: req.body.id_periode,
        id_recette: req.body.id_recette,
        id_membre: req.id_membre,
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
    const id_membre = req.id_membre;
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
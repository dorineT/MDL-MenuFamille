const db = require("../models");
const tag_periodeController = db.tag_periode;
const Op = db.Sequelize.Op;

// Retrieve all Tag from the database.
exports.findAll = (req, res) => {
    tag_periodeController.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tag."
            });
        });
};

exports.PutTag_periode = (req, res) => {
    tag_periodeController.create({id_tag: req.body.id_tag,id_periode : req.body.id_periode})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while inserting tag"
            });
        });
};

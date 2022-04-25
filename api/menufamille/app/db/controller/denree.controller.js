const db = require("../models");
const Denree = db.denree;
const Op = db.Sequelize.Op;
const {asyncForEach} = require("../../middleware/asyncForEach");
//const {get_stats_from_name} = require("../../middleware/openFoodFact");


  //// Find with like recipe

  exports.FindWithLike = (req, res) => {
    const lettres = req.params.nom + "%";
    Denree.findAll({
      where: { nom : {[Op.iLike]: lettres}}     
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    }); 
  }


  //// Find or Create 

  exports.FindOrCreate = async (req, res) => {
    const nomArg = req.params.nom;
    //const stats = get_stats_from_name(nomArg)[0]
    await Denree.findOrCreate({
      where: { nom:  nomArg },
      /*defaults:{
        nutriscore: stats[2].toUpperCase(),
        calories: stats[3]
      }*/
    }).then( async (data) => {
      if (data[1] == true){
        const id_new_denree = data[0].id_denree;
        const typesList = req.query.types
        asyncForEach(typesList, async(link_type)=>{
          await db.denree_type.create({
            id_denree: id_new_denree,
            id_type: link_type.id_type,
          
          })
        })
      }
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    }); 
  }

  //// Get nutriscore and calories

  exports.Get_Nut_and_Cal = (req, res) => {
    const id_denreeArg = req.params.id_denree
    Denree.findAll({
      where: {id_denree: id_denreeArg},
      attributes: ['nutriscore', 'calories']
    }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving denree."
      });
    });
  }
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 * {
    "nom":"CRAYON",
    "nutriscore":"A",
    "calories":300,
    "type":[
        {"id_type":1},
        {"id_type":2}
    ]
}
 */
  exports.post_denree_and_type = async (req,res)=>{
    await Denree.create({
      nom: req.body.nom,
      nutriscore: req.body.nutriscore,
      calories:req.body.calories
    })
        .then(async(data) => {
          const id_new_denree = data.id_denree;
          asyncForEach(req.body.type,async(link_type)=>{
            await db.denree_type.create({
              id_denree: id_new_denree,
              id_type: link_type.id_type
            })
          })
          res.send(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while inserting denree"
          });

        });

  }

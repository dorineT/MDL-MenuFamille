const { asyncForEach } = require("../../middleware/asyncForEach");
const { getTypes } = require("../../middleware/openFoodFact");

module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("type", {
      id_type: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
        timestamps: false
    });

    Type.sync();

    Type.findAndCountAll().then(count => {
      if (count === 0) {
        getTypes().then(async types => {
          await asyncForEach(types, async (type) => {
            Type.create({nom: type})
          });
        })
        
      }
   })
    
    return Type;
};
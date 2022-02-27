
/* this file need the classes files to work. please merge them as soon as possible thanks a lot. 
the Sequelize should be okay but need testing too */

/*function Search_recipe(S_Tag, S_Type){

    const{Op} = require('@sequelize/core');
    
    let recipes = null;

    if (S_Tag == null && S_Type == null) {
        recipes = Recipe.findAll();
    } else if (S_Tag == null) {
        recipes = Recipe.findAll({
            where: {
                type = S_Type
            }
        });
    } else if (S_Type == null) {
        recipes = Recipe.findAll({
            where: {
                tag = S_Tag
            }
        });
    } else {
        recipes = Recipe.findAll({
            where: {
                [Op.add]: [
                    type = S_Type,
                    tag = S_Tag
                ]
            }
        });
    }

    return recipes;
}*/



/**
 * lister toutes les recttes avec leur tags
 * chercher une recette et obtenir TOUTES ses infos
 * + crud habituel
 * 
 * 
 * se baser sur type.controller.js (fonctionne) (dossier controller)
 * et les infos sont sur la bd en ligne de david
 * les routes sont ajouter dans index.js pour la base
 * les spec de route (dossier route) dans un fichier dédié (voir type.js)
 * idem un par table
 */
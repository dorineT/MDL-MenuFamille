import api from './api'
var qs = require('qs');
export default class RecetteDAO{

    /**
     * Get toutes les recettes et leur tag
     */
    getAll(){
      return api.get("/recette/AllTags/")
    }


    /**
     * Get une recette et ses infos par id
     */
    getById(id_recette){      
      return api.get("/recette/FindRecipe/"+id_recette)
  }

    /**
     * Get les recettes en fonction de Tag donnés
     */
    getFromTags(tags){       
        let sendTags = []
        tags.forEach(element => {
          sendTags.push(element.nom)
        });
        console.log(sendTags)
        return api.get("/recette/FindFromTags/",{
          params: {
            tag: sendTags
          },
          paramsSerializer: params => {
            return qs.stringify(params)
          }
        })
    }
}
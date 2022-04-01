import api from './api'
var qs = require('qs');
export default class RecetteDAO{

    /**
     * Get toutes les recettes et leur tag
     */
    async getAll(){
        let data
        await api.get("/recette/AllTags/")
          .then((response) => {            
            data = response.data
          }); 
        
        return data
    }


    /**
     * Get une recette et ses infos par id
     */
     async getById(id_recette){
      let data
      await api.get("/recette/FindRecipe/"+id_recette)
        .then((response) => {            
          data = response.data
        }); 
      
      return data
  }

    /**
     * Get les recettes en fonction de Tag donnés
     */
     async getFromTags(tags){
        let data
        let sendTags = []
        tags.forEach(element => {
          sendTags.push(element.nom)
        });
        console.log(sendTags)
        await api.get("/recette/FindFromTags/",{
          params: {
            tag: sendTags
          },
          paramsSerializer: params => {
            return qs.stringify(params)
          }
        })
          .then((response) => {            
            data = response.data            
          }); 
        
        return data
    }
}
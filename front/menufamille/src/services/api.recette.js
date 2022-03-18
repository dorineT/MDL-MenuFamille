import api from './api'
export default class RecetteDAO{

    /**
     * Get toutes les recettes et leur tag
     */
    async getAll(){
        let data
        await api.get("/recette/AllTags/")
          .then((response) => {            
            data = response
          }); 
        
        return data
    }

    /**
     * Get les recettes en fonction de Tag donnés
     */
     async getFromTags(tags){
        let data
        await api.get("/recette/AllTags/")
          .then((response) => {            
            data = response
          }); 
        
        return data
    }
}
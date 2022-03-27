import api from './api'
// ! api.menuSuggestion.js doit être supprimé
export default class MenuSugg{
    /**
     * récupère les menus suggérés en fonction de la famille sélectionner
     * @param familleID : ID de la famille
     */

   async getMenuSuggestion(familleID){  
       let menusSugg = []

       await api.get("/menu/GetAllInfo/"+ familleID)   
       .then((response)=> {
           menusSugg = response.data.suggestions  //à vérifier
        });

       return menusSugg

       
   }

   /**
    * récupère le menu suggérés avec son ID
    * @param menuId : ID du menu suggéré
    */
   async getMenuSuggestionById(menuId){
       let menuSuggestion 

       await api.get("/menu/GetAllInfo/"+ menuId)
       .then((response) => {

       menuSuggestion = response.data.suggestions   //à vérifier    
                                        //!! plats identiques

   
   });
   return menuSuggestion
    }

    /**
     * envoie les nouvelles suggestions à l'API
     * @param postSuggestionMenu : nouveau menu de suggestion
     */
     sendPostSuggestionMenu(postSuggestionMenu){
         api.put("/menu/suggestions/",{  // à vérifier l'url
             suggestions: postSuggestionMenu,
         })


     }



}


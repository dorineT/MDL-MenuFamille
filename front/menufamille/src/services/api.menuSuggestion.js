import api from './api'

export default class MenuSugg{
    /**
     * récupère les menus suggérés en fonction de la famille sélectionner
     * @param familleID
     */

   async getMenuSuggestion(familleID){  
       let menusSugg = []

       await api.get("/menu/GetAllInfo/" + familleID)   
       .then((response)=> {
           menusSugg = response.data
        });

       return menusSugg

       
   }

   /**
    * récupère le menu suggérés avec son ID
    * @param menuId
    */
   async getMenuSuggestionById(menuId){
       let menuSuggestion 

       await api.get("/menu/GetAllInfo/" + menuId)
       .then((response) => {

       menuSuggestion = response.data       //!! plats identiques

   
   });
   return menuSuggestion
}


}


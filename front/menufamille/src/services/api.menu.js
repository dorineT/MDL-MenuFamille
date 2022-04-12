import api from './api'

export default class MenuDao{
    /**
     * Get les menus validés (verrou à true) selon la famille sélectionnée
     * @param idFamille
     */
    getMenuLock(idFamille) {        
        return api.get("/menu/GetLockedMenu/"+idFamille)        
    }

    /**
     * Envoie le nouveau menu à l'api par post
     * @param newMenu le nouveau menu
     * @param idFamille l'id de la famille
     */
    sendMenuCreate(newMenu){  
        return api.post("/menu/new_menu",newMenu)
    }

    /**
     * Envoie le menu modifié (sans tous ses objets jours etc)
     * @param {*} newMenu le menu a modifier
     */
    sendMenuUpdate(menu){
      api.put("/menu/"+menu.id_menu, menu)
    }

    /**
     * Envoi une nouvelle suggestion
     * @param {*} suggestion la suggestion (object)
     */
    sendMenuAddSuggestion(suggestion){
      api.put("/suggestion/"+suggestion.id_periode+"/"+suggestion.id_recette+"/"+suggestion.id_menu)
    }



    /**
     * Envoie une periode modifiée
     * @param {*} periode 
     */
     sendPeriodeUpdate(periode){    
      console.log("envoi")
      console.log(periode)
      api.put("/calendrier_recette/Update_Periode_with_Tag/"+periode.id_periode,periode)
    }

    /**
     * Recupere un menu selon son id avec toutes ses informations (jour, periode, recette)
     * @param {*} idMenu 
     * @returns 
     */
    async getMenuById(idMenu){
      return api.get("/menu/GetAllInfo/"+idMenu)
    }

    /**
     * recupere les menus selon une famille sans toute les infos (destinee a recuperer les periodes)
     * uniquement pour les menus que le parent peut modifier (manuel ou auto)
     * @param {*} idFamille 
     * @returns 
     */
    async getMenuUnlocked(idFamille){    
      return api.get("/menu/GetUnlockedMenu/"+idFamille)
    }

    /**
     * recuperer les menus sans les infos (periode)
     * uniquement les menu type manual pour les suggestions
     * @param {*} idFamille 
     * @returns 
     */
    async getMenuSuggestionUnlocked(idFamille){     
      return api.get("/menu/GetSuggestUnlockedMenu/"+idFamille)
    }


}


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
    sendMenuCreate(newMenu, idFamille){  
        api.post("/menu/",{
          menu: newMenu,
          id_famille: idFamille
        })
    }

    /**
     * Envoie le menu modifié
     * @param {*} newMenu le menu a modifier
     */
    sendMenuUpdate(newMenu){      
      api.put("/menu/",{
        menu: newMenu,
      })
    }

    /**
     * Envoie une periode avec une nouvelle suggestion
     * @param {*} periode 
     */
    sendPeriodeUpdateSuggestion(periode){    
      // adapt to api   
      /*api.put("/suggestion/",{
        periode: periode,
      })*/
    }



    /**
     * Envoie une periode modifiée
     * @param {*} periode 
     */
     sendPeriodeUpdate(periode){    
      // adapt to api   
      /*api.put("/calendrier_recette/",{
        periode: periode,
      })*/
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


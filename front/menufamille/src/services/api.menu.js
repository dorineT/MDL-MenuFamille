import api from './api'

export default class MenuDao{
    /**
     * Get les menus validés (verrou à true) selon la famille sélectionnée
     * @param idFamille
     */
    async getMenuLock(idFamille) { 
        let menus = []
        
        await api.get("/menu/GetLockedMenu/"+idFamille)
          .then((response) => {            
            menus = response.data
                      
          });        
        return menus 
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
      let menu
        
      await api.get("/menu/GetAllInfo/"+idMenu)
        .then((response) => {            
          menu = response.data  
          
          menu.plat_identique_matin = menu.plat_identique_matin === -1 ? null : menu.plat_identique_matin
          menu.plat_identique_midi = menu.plat_identique_midi === -1 ? null : menu.plat_identique_midi
          menu.plat_identique_soir = menu.plat_identique_soir === -1 ? null : menu.plat_identique_soir
        });
               

      return menu
    }

    /**
     * recupere les menus selon une famille sans toute les infos (destinee a recuperer les periodes)
     * uniquement pour les menus que le parent peut modifier (manuel ou auto)
     * @param {*} idFamille 
     * @returns 
     */
    async getMenuUnlocked(idFamille){
      let menus = []
      await api.get("/menu/GetUnlockedMenu/"+idFamille).then((response) =>{
        menus = response.data
      })

      return menus
    }

    /**
     * recuperer les menus sans les infos (periode)
     * uniquement les menu type manual pour les suggestions
     * @param {*} idFamille 
     * @returns 
     */
    async getMenuSuggestionUnlocked(idFamille){
      let suggestionMenus = []
      await api.get("/menu/GetSuggestUnlockedMenu/"+idFamille).then((response) =>{
        suggestionMenus = response.data
       
      })

      return suggestionMenus
    }


}


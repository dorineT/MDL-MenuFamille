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


    async getMenuUnlocked(idFamille){
      let menus = []
      await api.get("/menu/GetUnlockedMenu/"+idFamille).then((response) =>{
        menus = response.data
      })

      return menus
    }

    async getSuggestionMenuById(idMenu){
      let suggestionMenu
        
      await api.get("/menu/GetAllInfo/"+idMenu)
        .then((response) => {            
          suggestionMenu = response.data  

        });
               

      return suggestionMenu
    }

    async getMenuSuggestionUnlocked(idFamille){
      let suggestionMenus = []
      await api.get("/menu/GetUnlockedMenu/"+idFamille).then((response) =>{
        suggestionMenus = response.data
       
      })

      return suggestionMenus
    }


}


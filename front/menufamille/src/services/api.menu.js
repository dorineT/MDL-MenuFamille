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
     */
    sendMenuCreate(newMenu, idFamille){  
        api.post("/menu/",{
          menu: newMenu,
          id_famille: idFamille
        })
    }

}


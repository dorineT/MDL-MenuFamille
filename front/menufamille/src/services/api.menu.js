import api from './api'

export default class MenuDao{
    /**
     * Get les menus validés (verrou à true) selon la famille sélectionnée
     * @param idFamille
     */
    function getMenuLock(idFamille) {
        api.get("/menu/signin", {
            email,
            password
          })
          .then((response) => {
            if (response.data.accessToken) {
              TokenService.setUser(response.data);
            }
            return response.data;
          });
    }
}
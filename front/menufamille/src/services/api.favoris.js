import api from './api'

export default class FavorisDao{
    
    /**
     * Recupere les recettes favorites d'un membre (passé dans le token d'identification)
     * @returns les favoris d'un membre
     */
    getAll(){
        return api.get("/favoris")
    }

    /**
     * Recherche si une recette est un favoris d'un membre
     * @param {*} idRecette 
     * @returns 
     */
    find(idRecette){
        return api.get("/favoris/"+idRecette)
    }


    create(idRecette){
        return api.post("/favoris",{
            id_recette: idRecette
        })
    }

    /**
     * Supprime un favoris d'un membre
     * @param {} idRecette 
     * @returns 
     */
    delete(idRecette){
        return api.delete("/favoris"+idRecette)
    }
}
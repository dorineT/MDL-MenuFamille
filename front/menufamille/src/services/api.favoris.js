import api from './api'

export default class FavorisDao{
    
    /**
     * Recupere les recettes favorites d'un membre (passé dans le token d'identification)
     * @returns les favoris d'un membre
     */
    getAll(){
        return api.get("/membres/listFav")
    }

    /**
     * Recherche si une recette est un favoris d'un membre
     * @param {*} idRecette 
     * @returns 
     */
    find(idRecette){
        return api.get("/membres/findFavoris/"+idRecette)
    }


    create(idRecette){
        return api.post("/membres/AddFav",{
            id_recette: idRecette
        })
    }

    /**
     * Supprime un favoris d'un membre
     * @param {} idRecette 
     * @returns 
     */
    deleteRecipe(idRecette){
        return api.delete("/membres/RemoveFav/"+idRecette)
    }
}
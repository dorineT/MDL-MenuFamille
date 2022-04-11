import api from './api'

export default class DenreeDao{
    /**
     * Rechercher une denree a partir de 3 lettre
     * @param {*} name 
     */
    searchProduct(name){
        return api.get("/denree/Like/"+name)
    }

    /**
     * Rechercher ou creer une denree à partir de son nom complet
     * @param {} name 
     */
    findCreateProduct(name){
        return api.get("/denree/FindOrCreate/"+name)
    }
}
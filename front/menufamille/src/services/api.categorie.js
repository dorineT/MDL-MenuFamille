import api from './api'

export default class CategorieDao{
    /**
     * 
     * @returns toutes les categories
     */
    getAll(){
        return api.get('categorie/')
    }
}
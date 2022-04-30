import api from './api'
var qs = require('qs');

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
    findCreateProduct(name, sendTypes, nutriscore, calories){
        return api.get("/denree/FindOrCreate/"+name+"/"+nutriscore+"/"+calories,{
          params: {
            types: sendTypes
          },
          paramsSerializer: params => {
            return qs.stringify(params)
          }
        })
    }

    /**
     * Get les produits d'open food fact sur base d'un nom et des types
     * @param {*} name 
     * @param {*} types 
     * @returns 
     */
    getOpenFoodFactProduct(name, types){
        let sendTypes = []
        types.forEach(element => {
            sendTypes.push(element.nom)
        });   
        return api.get("/menu/food/"+name,{
          params: {
            types: sendTypes
          },
          paramsSerializer: params => {
            return qs.stringify(params)
          }
        })
    }
}
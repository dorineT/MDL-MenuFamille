import api from './api'

export default class TypeDao{
    findAll(){
        return api.get('/type')
    }
}
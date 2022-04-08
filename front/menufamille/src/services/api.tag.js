import api from './api'

export default class TagDAO{

    /**
     * Get all tags
     */
    async getAll(){    
        return api.get('/tag')
    }
}
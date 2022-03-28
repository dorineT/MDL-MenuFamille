import api from './api'

export default class TagDAO{

    /**
     * Get all tags
     */
    async getAll(){
        let tags 
        await api.get('/tag')          
        .then((response) => {            
            tags = response.data
                      
          });        
        return tags 
    }
}
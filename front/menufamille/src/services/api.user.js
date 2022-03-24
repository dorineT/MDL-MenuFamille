import api from './api'

export default class UserDao{
    /**
     * remove member in database
     * @param idMembre
     */
    removeUser(idMembre) {        
        return api.delete("/user/"+ idMembre)
    }
}
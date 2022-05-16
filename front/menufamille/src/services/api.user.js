import api from './api'

export default class UserDao{
    /**
     * remove member in database
     * @param idMembre
     */
    removeUser(idMembre) {        
        return api.delete("/user/remove/"+ idMembre);
    }

    updateUser(user) {
        return api.put("/user/" + user.id, {firstname: user.firstname, lastname: user.lastname})
    }

    updateUserPwd(id, data) {
        return api.put("/user/pwd/" + id, data)
    }

    removeNotif(id_famille) {
        return api.delete("/user/notif/delete/"+id_famille);
    }
}
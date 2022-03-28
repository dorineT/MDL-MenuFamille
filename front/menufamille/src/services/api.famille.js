import api from './api'

export default class FamilyDao{

    getMembers(id_family) {
        return api.get("/membres/GetListMembre/" + id_family);
    }
}
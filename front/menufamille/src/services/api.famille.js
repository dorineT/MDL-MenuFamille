import api from './api'

export default class FamilyDao{

    getMembers(id_family) {
        return api.get("/membres/GetListMembre/" + id_family);
    }

    removeMember(id_family, id_member) {
        return api.delete("/famille/"+ id_family+"/"+id_member);
    }

    getCodeFamily(id_famille) {
        return api.get("/famille/CheckAccesCode/0/"+id_famille);
    }
}
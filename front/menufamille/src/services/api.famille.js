import api from './api'

export default class FamilyDao{

    getMembers(id_family) {
        return api.get("/famille/GetListMembre/" + id_family);
    }

    getRequest(id_family) {
        return api.get("/famille/Request/"+ id_family);
    }

    removeMember(id_family, id_member) {
        return api.delete("/famille/"+ id_family+"/"+id_member);
    }

    getCodeFamily(id_famille) {
        return api.get("/famille/CheckAccesCode/"+id_famille);
    }

    updateRequest(type, id_famille, id_membre) {
        return api.put("famille/request/"+ id_membre +"/"+ id_famille +"/"+type);
    }

    joinFamily(code) {
        return api.post("/famille/join", {code: code});
    }

    switchRole(id_membre, id_famille, role) {
        return api.put("/famille/switch/"+id_famille+"/"+id_membre, {role:role});
    }

    getNotif() {
        return api.get("/famille/notif");
    }

    removeFamily(id_famille) {
        return api.delete("/famille/"+id_famille);
    }
}
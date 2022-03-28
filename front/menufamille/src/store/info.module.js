export const info = {
    namespaced: true,
    state() {
        return{
            idFamilleActuel: null,
            nomFamille: null,
            nbMembreActuel: null,
            roleActuel: 'enfant'
        }
    },
    actions:{
        changeFamille({commit}, [id, name, nbM, role]){
            commit('changeFamille', id)
            commit('changeNBM', nbM)
            commit('changeRole', role)
            commit('changeName', name)
        }
    },
    mutations:{
        changeFamille(state, id){
            state.idFamilleActuel = id            
        },
        changeNBM(state, nbM){
            state.nbMembreActuel = nbM
        },
        changeRole(state, role){
            state.roleActuel = role
        },
        changeName(state, name) {
            state.nomFamille = name
        }
    }
}
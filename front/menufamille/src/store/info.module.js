export const info = {
    namespaced: true,
    state() {
        return{
            idFamilleActuel: null,
            nbMembreActuel: null,
            roleActuel: 'enfant'
        }
    },
    actions:{
        changeFamille({commit}, [id, nbM, role]){
            console.log(nbM)
            commit('changeFamille', id)
            commit('changeNBM', nbM)
            commit('changeRole', role)
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
        }
    },
}
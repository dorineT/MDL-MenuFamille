
const infoState = JSON.parse(localStorage.getItem('info'));
const initialState = infoState
export const info = {
    namespaced: true,
    state: initialState,
    actions:{
        changeFamille({commit}, [id, name, nbM, role]){
            commit('changeFamille', id)
            commit('changeNBM', nbM)
            commit('changeRole', role)
            commit('changeName', name)
        },
        reset({commit}) {
            commit("reset")
        }
    },
    mutations:{
        changeFamille(state, id){
            state.idFamilleActuel = id     
            localStorage.setItem("info", JSON.stringify(state));       
        },
        changeNBM(state, nbM){
            state.nbMembreActuel = nbM
            localStorage.setItem("info", JSON.stringify(state)); 
        },
        changeRole(state, role){
            state.roleActuel = role
            localStorage.setItem("info", JSON.stringify(state)); 
        },
        changeName(state, name) {
            state.nomFamille = name
            localStorage.setItem("info", JSON.stringify(state)); 
        },
        reset(state) {
            state.idFamilleActuel = null
            state.nbMembreActuel = null
            state.roleActuel = 'enfant'
            state.nomFamille = null
            localStorage.setItem("info", JSON.stringify(state)); 
        }
    }
}
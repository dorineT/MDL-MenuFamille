export const loading = {
    namespaced: true,
    state() {
        return{
            isLoading: false,
            isError: false,
            message: ""
        }
    },
    actions:{
        loading({commit}){
            commit("changeLoading");
        },
        error({commit}, message) {
            commit("changeError", message);
        },
        reset({commit}) {
            commit("reset");
        },
    },
    mutations:{
        changeLoading(state){
            state.isLoading = true
        },
        changeError(state, message){
            state.isError = true,
            state.isLoading = false,
            state.message = message
        },
        reset(state) {
            state.isLoading = false,
            state.isError = false,
            state.message = ""
        }
    }
}
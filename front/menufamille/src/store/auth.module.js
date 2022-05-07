import AuthService from '../services/auth.service';
import UserDao from '../services/api.user';
let DAOUser = new UserDao();
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    updateRoles( {commit} , user) {
      commit('updateRoles', user);
    },
    update( {commit} , user) {
      return DAOUser.updateUser(user).then(
        (response) => {       
          commit('update', user)  
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }, accessToken) {
      commit('refreshToken', accessToken);
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    updateRoles(state, user) {
      state.status.loggedIn = true;
      state.user = { ...state.user, roles: user.roles};
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log(localStorage.getItem('user'))
    },
    update(state, user) {
      state.status.loggedIn = true;
      state.user = { ...state.user, firstname: user.firstname, lastname: user.lastname};
      localStorage.setItem("user", JSON.stringify(state.user));

    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
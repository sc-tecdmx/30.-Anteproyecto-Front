import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state() {
    return {
      status: '',
      token: localStorage.getItem('token') || '',
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      exercise: localStorage.getItem('ejercicio') || '',
      scenario: localStorage.getItem('escenario') || '',
      isSidebarOpen: true,
    };
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user, warnings }) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.user = {};
    },
    auth_logout_request(state) {
      state.status = 'loading';
    },
    auth_logout_error(state) {
      state.status = '';
      state.token = '';
      state.user = {};
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios
          .post(`${process.env.VUE_APP_API_URL}/login`, credentials)
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('ejercicio', credentials.exercise);
            localStorage.setItem('responsables', JSON.stringify(resp.data.responsables));
            localStorage.setItem('escenario', credentials.scenario);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.headers.common['ejercicio'] = credentials.exercise;
            axios.defaults.headers.common['Responsables'] = JSON.stringify(resp.data.responsables);
            axios.defaults.headers.common['escenario'] = credentials.scenario;
            commit('auth_success', { token, user });
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('responsables');
            localStorage.removeItem('ejercicio');
            localStorage.removeItem('escenario');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_logout_request');
        axios
          .post(`${process.env.VUE_APP_API_URL}/logout`, null)
          .then(() => {
            commit('logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('responsables');
            localStorage.removeItem('ejercicio');
            localStorage.removeItem('escenario');
            delete axios.defaults.headers.common['Authorization'];
            delete axios.defaults.headers.common['ejercicio'];
            delete axios.defaults.headers.common['Responsables'];
            delete axios.defaults.headers.common['escenario'];
            resolve();
          })
          .catch((err) => {
            commit('auth_logout_error');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('responsables');
            localStorage.removeItem('ejercicio');
            localStorage.removeItem('escenario');
            delete axios.defaults.headers.common['Authorization'];
            delete axios.defaults.headers.common['ejercicio'];
            delete axios.defaults.headers.common['Responsables'];
            delete axios.defaults.headers.common['escenario'];
            reject(err);
          });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    userLogged: (state) => state.user,
    token: (state) => state.token,
    isSidebarOpen: (state) => state.isSidebarOpen,
    getExercise: (state) => state.exercise,
    getScenario: (state) => state.scenario
  },
});

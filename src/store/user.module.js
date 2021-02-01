import {userService} from "@/services/user.service";
import router from "@/router";
import Vue from 'vue'
const user = JSON.parse(localStorage.getItem('user'));
const state = {
  status: {},
  user: user,
  loading: false
}

const actions = {
  login({commit, state}, user) {
    state.loading = true
    userService.login(user)
      .then(user => {
        commit('loginSuccess', user);
      }).catch(response => {
      commit('loginFail', response);
    })
  },
  logout({commit}) {
    userService.logout();
    commit('logout');
  },
}

const mutations = {
  loginSuccess(state, user) {
    state.loading = false;
    state.status = {loggedIn: true};
    state.user = user;
    router.push({name: 'Home'});
  },
  loginFail(state, error) {
    state.loading = false;
    Vue.swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.text,
    });
    state.status = {loggedIn: false};
    state.user = null;
  },
  logout(state) {
    state.status = {loggedIn: false};
    state.user = null;
  },
}

export const userAccount = {
  namespaced: true,
  state,
  actions,
  mutations
};

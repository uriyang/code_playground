import JwtService from "@/common/jwt.service"

// TODO: 항목들 더 채워 넣어야 함
const state = {
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
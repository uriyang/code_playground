import Vue from 'vue';
import Vuex from 'vuex';

import home from './modules/home.module';
import auth from './modules/auth.module';
import article from './modules/article.module';
import profile from './modules/profile.module';

Vue.use(Vuex);

// TODO: new Vuex.Store에 modules로 들어가는거랑 일반이랑 무슨 차이
export default new Vuex.Store({
  modules: {
    home,
    auth,
    article,
    profile
  }
})
import Vue from 'vue';
import Vuex from 'vuex';

// TODO: module 폴더 만들기
import home from './home.module';
import auth from './auth.module';
import article from './article.module';
import profile from './profile.module';

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
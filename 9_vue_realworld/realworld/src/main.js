import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

// TODO: 요기도 아직 붙혀야 할 기능들 있음

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

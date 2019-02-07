import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';

// import CSS
import 'ant-design-vue/dist/antd.css';
import './assets/style/global.scss';

// TODO: 요기도 아직 붙혀야 할 기능들 있음

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

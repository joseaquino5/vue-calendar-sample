import Vue from 'vue'
import Buefy from 'buefy'
import VeeValidate from 'vee-validate';
import App from './App.vue'
import router from './router'
import store from './store'
import 'buefy/dist/buefy.css'
import "bulma-badge/dist/css/bulma-badge.min.css";
import "material-icons/iconfont/material-icons.css";
import './core/filters'
import "./assets/app.scss";
import "./assets/css/materialdesignicons.min.css";

Vue.use(Buefy);
Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

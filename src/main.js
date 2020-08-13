import Vue from "vue";
import VueRouter from "vue-router";
import {
  store
} from "./store/store";

import Master from "./components/layouts/Master";
import routes from './routes';

import VAnimateCss from "v-animate-css";

Vue.config.productionTip = false;
Vue.use(VAnimateCss);
Vue.use(VueRouter);
window.eventBus = new Vue({});

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router: router,
  store: store,
  render: (h) => h(Master),
}).$mount("#app");
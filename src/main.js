import Vue from "vue";
import {
  store
} from "./store/store";
import {
  auth
} from './firebase';

import Master from "./components/layouts/Master";
import router from './routes';

import VAnimateCss from "v-animate-css";

Vue.config.productionTip = false;
Vue.use(VAnimateCss);
window.eventBus = new Vue({});

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router: router,
      store: store,
      render: (h) => h(Master),
    }).$mount("#app");
  }
});
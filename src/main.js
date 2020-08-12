import Vue from "vue";
// import App from "./App.vue";
import Master from "./components/layouts/Master";
import {
  store
} from "./store/store";

Vue.config.productionTip = false;
import VAnimateCss from "v-animate-css";
Vue.use(VAnimateCss);

window.eventBus = new Vue({});

new Vue({
  store: store,
  render: (h) => h(Master),
}).$mount("#app");
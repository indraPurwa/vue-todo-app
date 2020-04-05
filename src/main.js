import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import VAnimateCss from "v-animate-css";
Vue.use(VAnimateCss);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

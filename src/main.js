import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {mixins} from "@/helpers/mixins";

Vue.config.productionTip = false

import {configureFakeBackend} from "@/helpers/fakeBackend";
configureFakeBackend();

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

Vue.mixin(mixins)

export const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
});

new Vue({
  router,
  store,
  mixins: [mixins],
  render: h => h(App)
}).$mount('#app')

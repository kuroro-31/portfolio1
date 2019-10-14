import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

// ==================================================== component読込
Vue.component('Nav', require('./components/Nav.vue').default);

// ==================================================== component読込

// ==================================================== その他ライブラリ読込
import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)

import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
Vue.use(VuePlyr)
// ==================================================== その他ライブラリ読込

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);
Vue.config.productionTip = false


// ==================================================== component読込
Vue.component('Nav', require('./components/Nav.vue').default);
// Vue.component('Calculator', require('./components/works/Calculator.vue').default);




// ==================================================== component読込



// ==================================================== その他ライブラリ読込
import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)

import VueTyperPlugin from 'vue-typer'
Vue.use(VueTyperPlugin)

import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')

import moment from 'vue-moment'
Vue.use(moment)

import 'particles.js'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'
Vue.use(VueScrollProgressBar)

// ==================================================== その他ライブラリ読込


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

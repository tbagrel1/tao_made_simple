import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '@/components/App'

import './globalStyle.styl'

Vue.prototype.$axios = axios
Vue.prototype.$jsonLog = (obj) => { console.log(JSON.stringify(obj)) }

Vue.use(BootstrapVue)

new Vue({
  render: createElt => createElt(App)
}).$mount('#app-container')

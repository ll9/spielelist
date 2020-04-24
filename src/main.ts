import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import "./style.scss"
import "./styles/typography.css"
import "./styles/utils.scss"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

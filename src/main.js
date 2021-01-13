import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/style/app.scss";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "./util/http";

//这里需要我来处理
import _ from "lodash";
Vue.prototype._ = _;



Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

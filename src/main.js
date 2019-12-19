import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入按需加载的 vant 组件
import './plugins/vant'
// 导入axios
import axios from 'axios'
// import './assets/css/global.css'
import moment from 'moment'

Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
})

// 设置基准路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
// 挂载axios在vue原型上

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.prototype.$http = axios
// 配置请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

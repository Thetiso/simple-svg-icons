import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import element from './utils/element-ui'
import VConsole from 'vconsole';
Vue.use(element)

Vue.config.productionTip = false

try {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
} catch (error) {
  const vConsole = new VConsole();
  vConsole.error(error)
}


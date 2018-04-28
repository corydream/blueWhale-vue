// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-default/index.css'
import layer from 'vue-layer'
import router from './router/route'
import echarts from 'echarts'
import echartsCloud from 'echarts-wordcloud'
import store from './store/index'
import VueResource from 'vue-resource'
import keyApi from './data/tempApi'
import ElementUI from 'element-ui'
import iView from 'iview';
import VueGridLayout from  "vue-grid-layout";
import VueLazyload from 'vue-lazyload';
import 'style/permission.css';
import 'style/iview.css';

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$echarts = echarts
Vue.prototype.$keyapi = keyApi;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueLazyload,{
  attempt: 3,
  loading: '/bgbdp/images/Loading_icon.gif',
  error: '/bgbdp/images/errorImg.png'
});

Vue.use(iView);
Vue.use(VueGridLayout)
Vue.use(echartsCloud)
/* eslint-disable no-new */
//声明一个全局的组件
Vue.component('GridLayout', VueGridLayout.GridLayout);
Vue.component('GridItem', VueGridLayout.GridItem);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

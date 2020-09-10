import Vue from 'vue';
import App from './App.vue';
import ui from './ui';
import filters from './filters';

Vue.use(ui);
Vue.use(filters);

new Vue({
  render: h => h(App),
}).$mount('#app');

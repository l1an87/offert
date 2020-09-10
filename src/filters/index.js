import currency from './currency';
import price from './price';

export default {
  install(Vue) {
    Vue.use(currency);
    Vue.use(price);
  },
};

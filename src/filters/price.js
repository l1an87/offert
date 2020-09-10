export default {
  install(Vue) {
    Vue.filter('price', (value, fixed = 0, isNull) => {
      if (!value) {
        return isNull ? '' : '0';
      }
      const text = value.toFixed(fixed)
        .toString();
      return text.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    });
  },
};

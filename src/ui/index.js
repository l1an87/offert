import UiBtn from './btn.vue';
import UiPrice from './price.vue';
import UiCheckbox from './checkbox.vue';
import UiLoading from './loading.vue';
import UiInput from './input.vue';

export default {
  install(Vue) {
    Vue.component('UiBtn', UiBtn);
    Vue.component('UiPrice', UiPrice);
    Vue.component('UiCheckbox', UiCheckbox);
    Vue.component('UiLoading', UiLoading);
    Vue.component('UiInput', UiInput);
  },
};

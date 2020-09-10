export const currencies = {
  RUR: '₽',
  RUB: '₽',
  EUR: '€',
  USD: '$',
  BYN: 'Br',
  UAH: '₴',
  KZT: '₸',
  GBP: '£',
};

export function getIcon(value) {
  return currencies[value?.toUpperCase()] || value;
}

export default {
  install(Vue) {
    Vue.filter('currency', getIcon);
  },
};

module.exports = {
  root: false,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  "globals": {
    "DEV": true
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-extend-native': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'prefer-promise-reject-errors': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

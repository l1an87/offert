const DEV = process.env.NODE_BUILD_NAME ? process.env.NODE_BUILD_NAME.indexOf('build') === -1 : false;
let Host = 'https://2015.mag.travel/';


if (process.env.NODE_BUILD_NAME === 'serve:test') {
  Host = 'http://test.mag.travel';
}

if (process.env.NODE_BUILD_NAME === 'serve:stable') {
  Host = 'https://stable.mag.travel';
}

console.log('proxy', Host);

module.exports = {
  publicPath: DEV ? '/' : 'https://static.mag.travel/document/offer/',
  chainWebpack: (config) => {
    config.plugin('define')
      .tap((definitions) => {
        definitions[0] = Object.assign(definitions[0], {
          DEV,
        });
        return definitions;
      });
    config.plugins.delete('prefetch');
  },
  devServer: DEV ? {
    port: 3073,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/tourclient': {
        target: Host,
        ws: true,
        changeOrigin: true,
      },
      '/search': {
        target: Host,
        ws: true,
        changeOrigin: true,
        pathRewrite: process.env.NODE_BUILD_NAME === 'serve:local' ? { '^/search': '' } : {},
      },
    },
  } : {},
};

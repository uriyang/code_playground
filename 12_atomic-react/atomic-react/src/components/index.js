const req = require.context(".", true, /\.\/[^/]+\/[^/]+\/index\.js$/);

req.keys().forEach(key => {
  const componentName = key.require(/^.+\/([^/]+)\/index\.js/, "$1");
  module.exports[componentName] = req(key).default;
});

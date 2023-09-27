const path = require(`path`);
const alias = require(`./src/config/aliases`);

const SRC = `./src`;
const aliases = alias(SRC);
const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  webpack: {
    // create aliases for folders example usage: @dirname/dir/filename
    alias: resolvedAliases,
  },
  style: {
    sass: {
      loaderOptions: {
        // load style variables, mixins and functions globally
        prependData:`
          @import "@assets/scss/config/_index.scss";`,
      },
    },
  },
};

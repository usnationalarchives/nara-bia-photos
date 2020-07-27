const path = require('path');
const paths = require('./paths.js');
const includePath = path.resolve(__dirname, '..');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
  ],
  webpackFinal: async (config) => {
    // Update storybook to use svgr instead of the default file loader
    // Source: https://duncanleung.com/import-svg-storybook-webpack-loader/#:~:text=Element%20type%20is%20invalid%3A%20expected,up%20default%20and%20named%20imports.
    // do mutation to the config
    // Add SVGR Loader
    // ========================================================
    const assetRule = config.module.rules.find(({ test }) => test.test('.svg'));
    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    };
    // Merge our rule with existing assetLoader rules
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack', assetLoader],
    });

    // Adds Aliases to Storybook config
    config.resolve.alias = {
      '#atoms': path.resolve(__dirname, '../src/client/atoms/'),
      '#client': path.resolve(__dirname, '../src/client/'),
      '#fonts': path.resolve(__dirname, '../src/fonts/'),
      '#helpers': path.resolve(__dirname, '../src/helpers/'),
      '#modules': path.resolve(__dirname, '../src/modules/'),
      '#data': path.resolve(__dirname, '../src/data/'),
      '#hooks': path.resolve(__dirname, '../src/hooks/'),
      '#images': path.resolve(__dirname, '../src/images/'),
      '#assets': path.resolve(__dirname, '../src/assets/'),
      '#molecules': path.resolve(__dirname, '../src/client/molecules/'),
      '#stories': path.resolve(__dirname, '../src/stories/'),
      '#components': path.resolve(__dirname, '../src/components/'),
      '#styles': path.resolve(__dirname, '../src/styles/'),
      '#tests': path.resolve(__dirname, '../src/tests/'),
    };

    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    });

    return config;
  },
};

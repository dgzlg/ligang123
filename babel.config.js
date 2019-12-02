/*
  This config file just available for jest(babel-jest)
  The sets for developing or building can be found in webpack.config.js
*/
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
};
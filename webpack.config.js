const path = require(`path`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);

module.exports = {
  entry: [
    `./js/index.js`,
  ],
  output: {
    filename: `./js/bundle.js`
  },
  devtool: `source-map`,
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, `js`),
      use: {
        loader: `babel-loader`,
        options: {
          presets: `env`
        }
      }
    },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: `./fonts`,
        to: `./fonts`
      },
      {
        from: `./favicon.ico`,
        to: `./favicon.ico`
      },
      {
        from: `./img`,
        to: `./img`
      },
      {
        from: `./photos`,
        to: `./photos`
      },
      {
        from: `./css`,
        to: `./css`
      },
      {
        from: `./index.html`,
        to: `./index.html`
      }
    ]),
  ]
};

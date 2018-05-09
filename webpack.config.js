const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            // CSSをバンドルするための機能
            {
              loader: 'css-loader',
              options: {
                // CSS内のurl()メソッドの取り込みを禁止する
                url: false,
                // ソースマップの利用有無
                sourceMap: true,
                // 空白文字やコメントを削除する
                minimize: true,
                // Sass+PostCSSの場合は2を指定
                importLoaders: 2
              },
            },
            // PostCSSのための設定
            {
              loader: 'postcss-loader',
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require('autoprefixer')({grid: true})
                ]
              },
            },
            // Sassをバンドルするための機能
            {
              loader: 'sass-loader',
              options: {
                // ソースマップの利用有無
                sourceMap: true,
              }
            }
          ],
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}

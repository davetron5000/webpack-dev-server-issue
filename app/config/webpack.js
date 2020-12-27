const path = require("path")
const { merge } = require("webpack-merge")
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const PROJECT_ROOT = path.resolve(__dirname, "..")

const commonConfig = {
  entry: "./js/index.js",
  module: {
    rules: [
      {
        test: /.html/i,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  mode: "none"
}


const productionConfig = {
  output: {
    path: path.resolve(PROJECT_ROOT, "production"),
    filename: "js/bundle-[contenthash].js"
  },
  devtool: "source-map",
  plugins: [
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/styles-[contenthash].css"
    }),
    new HtmlPlugin({
      filename: path.resolve(PROJECT_ROOT,"production","index.html"),
      template: "./html/index.html"
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      "...",
      new CssMinimizerPlugin()
    ]
  }
}

const devConfig = {
  output: {
    path: path.resolve(PROJECT_ROOT, "development"),
    filename: "js/bundle.js"
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css"
    }),
    new HtmlPlugin({
      filename: path.resolve(PROJECT_ROOT,"development","index.html"),
      template: "./html/index.html"
    })
  ],
  devServer: {
	  port: 3000,
	  sockPort: 8888,
	  host: "0.0.0.0",
	  public: "localhost:8888",
	  contentBase: "./development"
  }
}

module.exports = (env) => {
  if (env.development) {
    return merge(commonConfig, devConfig)
  } else if (env.production) {
    return merge(commonConfig, productionConfig)
  } else {
    throw new Error(
      "Specify --env production or " + 
      "--env development on the command line")
  }
}

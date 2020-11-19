const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//提取css
const  { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    'main': './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer:{
      open:true
  },
  resolve:{
    "extensions":['.ts','.js','.json']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
      exclude:[
        path.resolve(__dirname,'src/components')
      ]
    },{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader,{//模块化局部样式配置
        loader:'css-loader',
        options: {
          // modules: true
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          }
        }
      }],
      include:[
        path.resolve(__dirname,'src/components')
      ]
    },{
      test:/\.(eot|woff2|woff|ttf|svg)$/,
      use:[{
        loader:'file-loader',
        options: {
          outputPath:'iconfont'
        }
      }]
    },{
      test:/\.ts$/,
      use:['ts-loader'],
      exclude:/node_modules/
    }]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}
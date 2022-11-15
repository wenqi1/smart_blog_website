// 引入 Node.js path 模块
const path = require('path')
// 引入clean-webpack-plugin插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 引入html模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // __dirname: 当前文件所属的绝对路径
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options:{
                            presets:['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ],
                exclude:/node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [ 'css-loader', 'less-loader' ]
            },
            {
                test: /\.(sass|scss)$/,
                use: ['css-loader', 'sass-loader' ]
            },
            { 
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ],
                type: 'javascript/auto'
             }, 
             {
                test: /\.(mp4|webm|ogg|mp3|wav)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
             }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                //打包公共模块
                commons: {
                    chunks: 'initial', // initial表示提取入口文件的公共部分
                    minChunks: 2, // 表示提取公共部分最少的文件数
                    minSize: 0, // 表示提取公共部分最小的大小
                    name: 'commons' // 提取出来的文件命名
                }
            }
        },
    },
    devServer: { 
        compress: true, // gzip压缩
        hot: true, // 热更新
        historyApiFallback: true, // 解决启动后刷新404
        open: true,
        port: 3000,
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': '/api'
                },
                changeOrigin: true
            }
        }
    }
}
const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production',
        isMocks = argv.mocks !== undefined;
    
    return {
        context: path.resolve(__dirname, './src'),
        entry: './app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'bundle.[hash].js' : 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: [
                        /node_modules/
                    ]
                },
                {
                    test: /\.s[ac]ss$|\.css/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [path.resolve(__dirname, './src/styles/variables.scss')]
                            },
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        'vue-svg-icon-loader',
                    ],
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: isProd ? './styles/style.[hash].css' : './styles/style.css'
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                favicon: './assets/favicon.ico'
            }),
            new webpack.DefinePlugin({
                mocks: isMocks
            }),
        ],
        resolve: {
            extensions: ['.js', '.vue', '.svg'],
            alias: {
                '@assets': path.resolve(__dirname, './src/assets')
            }
        }
    };
};

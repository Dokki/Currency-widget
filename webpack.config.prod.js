const merge = require('webpack-merge');
const config = require('./webpack.config.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {

    return merge(config(env, argv), {
        mode: 'production',
        devtool: false,
        performance: { hints: false },
        optimization: {
            nodeEnv: 'production',
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                    extractComments: false
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    });
};
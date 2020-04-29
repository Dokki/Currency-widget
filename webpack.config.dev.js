const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config.common.js');

module.exports = (env, argv) => {

    return merge(config(env, argv), {
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true
        }
    });
};
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

/**
 * @type webpack.Configuration
 */
module.exports = {
    entry: {
        main: './src/main.js',
        serverTest: '../src/serverTest.js'
    },
    optimization: {
        minimize: false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-react-jsx',
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    }
};

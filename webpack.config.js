const path = require('path');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
    mode: 'none', // disable minify for bundled file
    devtool: 'inline-source-map',
    context: __dirname,
    entry: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.ts')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Code.js',
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ],
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@kenchan0130/babel-preset-google-apps-script'
                    ],
                }
            }
        ],
    },
    plugins: [
        new GasPlugin(),
    ],
}
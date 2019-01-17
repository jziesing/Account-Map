var path = require('path');

var clientapp = {
    context: path.join(__dirname, "./Client/src"),
    entry: "./Client.js",
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'add-module-exports']
                }
            }
        ]
    },
    output: {
        filename: "./Client/build/index.js"
    }
}

module.exports = [ clientapp ];

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'none',
    entry:'./src',
    output:{
        path:path.resolve('./dist'),
        filename:'bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({title:'lit-loader example', template:'./src/index.html'})
    ],
    module:{
        rules:[]
    }
};

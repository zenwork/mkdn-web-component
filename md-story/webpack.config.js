const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode:'none',
	entry:'./src',
	output:{
		path:path.resolve('./dist'),
		filename:'md-story.js'
	},
	plugins:[
		new HtmlWebpackPlugin({
			                      title:'md-story empty',
			                      filename:'demo/index.html',
			                      template:'./test/demo/index.html'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story empty',
			                      filename:'demo/empty.html',
			                      template:'!!ejs-webpack-loader!./test/demo/empty.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story simple',
			                      filename:'demo/simple.html',
			                      template:'!!ejs-webpack-loader!./test/demo/simple.ejs'
		                      }),
		new CopyWebpackPlugin([
			                      {
				                      from:'./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
				                      to:'webcomponents-bundle.js'
			                      }
		                      ])
	],
	module:{
		rules:[]
	}
};

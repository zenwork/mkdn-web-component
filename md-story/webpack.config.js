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
			                      filename:'index.html',
			                      template:'./src/templates/index.html'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story empty',
			                      filename:'empty.html',
			                      template:'!!ejs-webpack-loader!./src/templates/empty.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story simple',
			                      filename:'simple.html',
			                      template:'!!ejs-webpack-loader!./src/templates/simple.ejs'
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

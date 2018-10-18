const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode:'none',
	entry:{
		'md-story':'./src/components/md-story.js',
		'md-history':'./src/components/md-history.js'
	},
	output:{
		filename:'[name].js',
		path:path.resolve(__dirname, 'dist')
	},
	plugins:[
		new HtmlWebpackPlugin({
			                      title:'demo',
			                      filename:'demo/index.html',
			                      template:'./test/demo/index.html'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'demo md-story',
			                      filename:'demo/mdstory/index.html',
			                      template:'./test/demo/mdstory/index.html'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'demo md-history',
			                      filename:'demo/mdhistory/index.html',
			                      template:'./test/demo/mdhistory/index.html'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story empty',
			                      filename:'demo/mdstory/empty.html',
			                      template:'!!ejs-webpack-loader!./test/demo/mdstory/empty.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story string',
			                      filename:'demo/mdstory/simple.html',
			                      template:'!!ejs-webpack-loader!./test/demo/mdstory/simple.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story simple formatting',
			                      filename:'demo/mdstory/simple-formatting.html',
			                      template:'!!ejs-webpack-loader!./test/demo/mdstory/simple-formatting.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-story attributes',
			                      filename:'demo/mdstory/attributes.html',
			                      template:'!!ejs-webpack-loader!./test/demo/mdstory/attributes.ejs'
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
	// ,
	// optimization:{
	// 	splitChunks: {
	// 		chunks:'all'
	// 	}
	// }
};

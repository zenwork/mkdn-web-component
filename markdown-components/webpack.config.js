const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode:'none',
	entry:{
		'md-story':'./src/components/md-story.js',
		'md-list':'./src/components/md-list.js',
		'md-view':'./src/components/md-view.js',
		'md-parentchild':'./src/shared/test-parent-child.js'
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
			                      title:'demo md-list',
			                      filename:'demo/mdlist/index.html',
			                      template:'./test/demo/mdlist/index.html'
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
		new HtmlWebpackPlugin({
			                      title:'md-list',
			                      filename:'demo/mdlist/base.html',
			                      template:'!!ejs-webpack-loader!./test/demo/mdlist/base.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'static md-view',
			                      filename:'demo/mdview/base.html',
			                      template:'!!ejs-webpack-loader!./test/demo/mdview/base.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-view',
			                      filename:'demo/mdview/backend.html',
			                      template:'!!ejs-webpack-loader!./test/demo/mdview/backend.ejs'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'md-view',
			                      filename:'demo/mdview/index.html',
			                      template:'./test/demo/mdview/index.html'
		                      }),
		new HtmlWebpackPlugin({
			                      title:'child-parent',
			                      filename:'demo/childparent/base.html',
			                      template:'!!ejs-webpack-loader!./test/demo/childparent/base.ejs'
		                      }),
		new CopyWebpackPlugin([
			                      {
				                      from:'./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
				                      to:'webcomponents-bundle.js'
			                      }
		                      ]),
		new CopyWebpackPlugin([
			                      {
				                      from:'./test/demo/mdview/index.json',
				                      to:'demo/mdview/index.json'
			                      }
		                      ]),
		new CopyWebpackPlugin([
			                      {
				                      from:'./test/demo/mdview/story-1.md',
				                      to:'demo/mdview/story-1.md'
			                      }
		                      ]),
		new CopyWebpackPlugin([
			                      {
				                      from:'./test/demo/mdview/story-2.md',
				                      to:'demo/mdview/story-2.md'
			                      }
		                      ])
	],
	module:{
		rules:[]
	},
	devtool:'source-map'
	// optimization:{
	// 	splitChunks:{
	// 		chunks:'all'
	// 	}
	// }
};

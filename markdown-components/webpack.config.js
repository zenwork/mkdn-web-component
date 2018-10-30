const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = require('./build/webpack-files.js');

let base = [
	new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
	new CopyWebpackPlugin(plugins.copyPlugins)
];

allplugins = base
	.concat(plugins.htmlPlugins)
	.concat(plugins.ejsPlugins);

/**
 * THE CONFIG
 */
module.exports = {
	mode:'none',
	entry:{
		'md-story':'./src/components/md-story.js',
		'md-list':'./src/components/md-list.js',
		'md-view':'./src/components/md-view.js',
		'md-crumbs':'./src/components/md-crumbs.js',
		'md-parentchild':'./test/test-parent-child.js',
		'mkdn-bundle':'./src/bundle.js'
	},
	output:{
		filename:'[name].js',
		path:path.resolve(__dirname, 'dist')
	},
	plugins:allplugins,
	module:{
		rules:[]
	},
	devtool:'source-map'
	// ,
	// optimization:{
	// 	splitChunks:{
	// 		chunks:'all'
	// 	}
	// }
};

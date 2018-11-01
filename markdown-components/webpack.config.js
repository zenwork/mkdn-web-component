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
		'mkdn-story':'./src/components/mkdn-story.js',
		'mkdn-list':'./src/components/mkdn-list.js',
		'mkdn-view':'./src/components/mkdn-view.js',
		'mkdn-nav':'./src/components/mkdn-nav.js',
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

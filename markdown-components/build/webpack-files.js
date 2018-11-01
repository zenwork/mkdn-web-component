const HtmlWebpackPlugin = require('html-webpack-plugin');

const template = {
	title:'',
	filename:'demo/',
	template:'./demo/',
	chunks:['mkdn-bundle', 'md-parentchild']
};

const html = [
	'index.html',
	'mkdnstory/index.html',
	'mkdnlist/index.html',
	'mkdnlist/index.html',
	'mkdnview/index.html'
];

const htmlPlugins = [];
html.map((path) => {
	const entry = {...template};
	entry.title = path;
	entry.filename += path;
	entry.template += path;
	htmlPlugins.push(new HtmlWebpackPlugin(entry));
});

const ejsTemplate = {
	title:'',
	filename:'demo/',
	template:'!!ejs-webpack-loader!./demo/',
	chunks:['mkdn-bundle', 'md-parentchild']
};

const ejs = [
	'mkdnstory/empty',
	'mkdnstory/simple',
	'mkdnstory/simple-formatting',
	'mkdnstory/attributes',
	'mkdnlist/base',
	'mkdnview/base',
	'mkdnview/backend',
	'childparent/base',
	'mkdnnavigation/base'
];

const ejsPlugins = [];
ejs.map((path) => {
	const entry = {...ejsTemplate};
	entry.title = path;
	entry.filename += path + '.html';
	entry.template += path + '.ejs';
	ejsPlugins.push(new HtmlWebpackPlugin(entry));
});

const copyPLugins = [
	{
		from:'./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
		to:'webcomponents-bundle.js'
	},
	{
		from:'./demo/mkdnview/index.json',
		to:'demo/mkdnview/index.json'
	},
	{
		from:'./demo/mkdnview/story-1.md',
		to:'demo/mkdnview/story-1.md'
	},
	{
		from:'./demo/mkdnview/story-2.md',
		to:'demo/mkdnview/story-2.md'
	}
];

module.exports = {
	htmlPlugins:htmlPlugins,
	ejsPlugins:ejsPlugins,
	copyPlugins:copyPLugins
};

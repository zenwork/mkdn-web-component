const HtmlWebpackPlugin = require('html-webpack-plugin');

const template = {
	title:'',
	filename:'demo/',
	template:'./demo/',
	chunks:['mkdn-bundle']
};

const html = [
	'index.html',
	'mdstory/index.html',
	'mdlist/index.html',
	'mdlist/index.html',
	'mdview/index.html'
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
	chunks:['mkdn-bundle']
};

const ejs = [
	'mdstory/empty',
	'mdstory/simple',
	'mdstory/simple-formatting',
	'mdstory/attributes',
	'mdlist/base',
	'mdview/base',
	'mdview/backend',
	'childparent/base',
	'mdnavigation/base'
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
		from:'./demo/mdview/index.json',
		to:'demo/mdview/index.json'
	},
	{
		from:'./demo/mdview/story-1.md',
		to:'demo/mdview/story-1.md'
	},
	{
		from:'./demo/mdview/story-2.md',
		to:'demo/mdview/story-2.md'
	}
];

module.exports = {
	htmlPlugins:htmlPlugins,
	ejsPlugins:ejsPlugins,
	copyPlugins:copyPLugins
};

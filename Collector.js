const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const htmlbuilder = require('./builders/HtmlBuilder');
const jsbuilder = require('./builders/JsBuilder');
const cssbuilder = require('./builders/CssBuilder');

const fileNameRegex = {'html': '([\\w]+.html)', 'js': '([\\w]+.js)', 'css': '([\\w]+.css)'}
const filesList = {'html': [], 'js': [], 'css': []};
const filesNameList = {'html': [], 'js': [], 'css': []};

const jsCode = [];
const cssCode = [];

function buildHtml() {
	filesList['html'] = htmlbuilder.getAllFiles();

	if (filesList['html'] !== undefined && filesList['html'].length > 0) {
		filesList['html'].forEach(file => 
			filesNameList['html'].push(htmlbuilder.getFileName(file, fileNameRegex['html']))
		);

		for (let i = 0; i < filesList['html'].length; i++)
			htmlbuilder.build(filesList['html'][i], filesNameList['html'][i]);
	}
}

function buildJs() {
	jsbuilder.createDirectory();

	filesList['js'] = jsbuilder.getAllFiles();

	if (filesList['js'] !== undefined && filesList['js'].length > 0) {
		filesList['js'].forEach(file =>
			filesNameList['js'].push(jsbuilder.getFileName(file, fileNameRegex['js']))
		);
	

		for (let i = 0; i < filesList['js'].length; i++)
			jsCode.push(jsbuilder.readFiles(filesList['js'][i], filesNameList['js'][i]));

		if (jsCode && jsCode.length > 0)
			jsbuilder.build(jsCode);
	}
}

function buildCss() {
	cssbuilder.createDirectory();

	filesList['css'] = cssbuilder.getAllFiles();

	if (filesList['css'] !== undefined && filesList['css'].length > 0) {
		filesList['css'].forEach(file =>
			filesNameList['css'].push(cssbuilder.getFileName(file, fileNameRegex['css']))
		);

		for (let i = 0; i < filesList['css'].length; i++)
			cssCode.push(cssbuilder.readFiles(filesList['css'][i], filesNameList['css'][i]));

		if (cssCode && cssCode.length > 0)
			cssbuilder.build(cssCode);
	}
}

if (!fs.existsSync(path.join(__dirname, '/result')))
	htmlbuilder.createResultDirectory();

buildHtml();
buildJs();
buildCss();
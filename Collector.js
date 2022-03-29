const fs = require('fs');
const path = require('path');

const regex = '\\[\\%([\\w\\s\\/\\\\\.\\:]+)\\%\\]';
const fileNameRegex = {'html': '([\\w]+.html)', 'js': '([\\w]+.js)', 'css': '([\\w]+.css)'}
const filesList = {'html': [], 'js': [], 'css': []};
const filesNameList = {'html': [], 'js': [], 'css': []};

const jsCode = [];
const cssCode = [];

function build(file, filename) {
	let filesCode = [];

	if (!fs.existsSync(file))
		return;

	let data = fs.readFileSync(file, 'utf-8');
	let code = Array.from(data.matchAll(regex));

	for (let i = 0; i < code.length; i++) {
		code[i][1] = code[i][1].trim();

		if (!fs.existsSync(code[i][1])) {
			console.log(`WARN > ${code[i][1]} not exists`);
			continue;
		}
		
		filesCode.push(fs.readFileSync(code[i][1], 'utf-8'));
	}

	for (let i = 0; i < code.length; i++) {
		if (!filesCode[i])
			continue;

		data = data.replace(code[i][0], filesCode[i]);
	}

	if (!fs.existsSync(path.join(__dirname, '/result')))
		fs.mkdir(path.join(__dirname, '/result'), err => {
			if (err)
				console.log(`ERROR > ${err.message}`);
				return;
		});

	let fd = fs.openSync(path.join(__dirname, 'result/', filename), 'w');
	fs.writeSync(fd, data);

	if (!fs.existsSync(path.join(__dirname, '/result/js')))
		fs.mkdir(path.join(__dirname, '/result/js'), err => {
			if (err)
				console.log(`ERROR > ${err.message}`);
		});

	if (!fs.existsSync(path.join(__dirname, '/result/css')))
		fs.mkdir(path.join(__dirname, '/result/css'), err => {
			if (err)
				console.log(`ERROR > ${err.message}`);
		});
}

function readJsFiles(file, filename) {
	if (!fs.existsSync(file))
		return;

	jsCode.push(`/* [${filename}] */\n${fs.readFileSync(file, 'utf-8')}\n`);
}

function readCssFiles(file, filename) {
	if (!fs.existsSync(file))
		return;

	cssCode.push(`/* [${filename}] */\n${fs.readFileSync(file, 'utf-8')}\n`);
}

function getAllHtmlFiles() {
	if (!fs.existsSync(path.join(__dirname, '/pages')))
		return;
	
	fs.readdirSync(path.join(__dirname, '/pages')).forEach(file => {
		if (file.endsWith('.html'))
			filesList['html'].push(path.join(__dirname, '/pages/', file));
	});
}

function getAllJsFiles() {
	if (!fs.existsSync(path.join(__dirname, '/scripts')))
		return;

	fs.readdirSync(path.join(__dirname, '/scripts')).forEach(file => {
		if (file.endsWith('.js'))
			filesList['js'].push(path.join(__dirname, '/scripts/', file));
	});
}

function getAllCssFiles() {
	if (!fs.existsSync(path.join(__dirname, '/views')))
		return;

	fs.readdirSync(path.join(__dirname, '/views')).forEach(file => {
		if (file.endsWith('.css'))
			filesList['css'].push(path.join(__dirname, '/views/', file));
	});
}

function buildJs() {
	if (!fs.existsSync(path.join(__dirname, 'result/js')))
		return;

	let fd = fs.openSync(path.join(__dirname, 'result/js/script.js'), 'w');
	fs.writeSync(fd, jsCode.join('\n'));
}

function buildCss() {
	if (!fs.existsSync(path.join(__dirname, 'result/css')))
		return;

	let fd = fs.openSync(path.join(__dirname, 'result/css/style.css'), 'w');
	fs.writeSync(fd, cssCode.join('\n'));
}

const getHtmlFilesName = path => 
	path.match(fileNameRegex['html'])[1];

const getJsFilesName = path =>
	path.match(fileNameRegex['js'])[1];

const getCssFilesName = path =>
	path.match(fileNameRegex['css'])[1];

getAllHtmlFiles();
getAllJsFiles();
getAllCssFiles();

filesList['html'].forEach(file => 
	filesNameList['html'].push(getHtmlFilesName(file))
);

filesList['js'].forEach(file =>
	filesNameList['js'].push(getJsFilesName(file))
);

filesList['css'].forEach(file =>
	filesNameList['css'].push(getCssFilesName(file))
);

for (let i = 0; i < filesList['html'].length; i++)
	build(filesList['html'][i], filesNameList['html'][i]);

for (let i = 0; i < filesList['js'].length; i++)
	readJsFiles(filesList['js'][i], filesNameList['js'][i]);

if (jsCode && jsCode.length > 0)
	buildJs();

for (let i = 0; i < filesList['css'].length; i++)
	readCssFiles(filesList['css'][i], filesNameList['css'][i]);

if (cssCode && cssCode.length > 0)
	buildCss();
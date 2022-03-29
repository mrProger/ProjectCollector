const fs = require('fs');
const path = require('path');

var regex = '\\[\\%([\\w\\s\\/\\\\\.\\:]+)\\%\\]';
var fileNameRegex = '([\\w]+.html)';
var filesList = [];
var filesNameList = [];

function build(file, filename) {
	let filesCode = [];

	if (!fs.existsSync(file))
		return;

	let data = fs.readFileSync(file, 'utf-8')
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
			if (err) {
				console.log(`ERROR > ${err.message}`);
				return;
			}
		});

	let fd = fs.openSync(path.join('result/', filename), 'w');
	fs.writeSync(fd, data);
}

function getAllHtmlFiles() {
	if (!fs.existsSync(path.join(__dirname, '/pages')))
		return;
	
	fs.readdirSync(path.join(__dirname, '/pages')).forEach(file => {
		if (file.endsWith('.html'))
			filesList.push(path.join(__dirname, '/pages/', file));
	});
}

const getHtmlFilesName = path => 
	path.match(fileNameRegex)[1];

getAllHtmlFiles();

filesList.forEach(file => 
	filesNameList.push(getHtmlFilesName(file))
);

for (let i = 0; i < filesList.length; i++)
	build(filesList[i], filesNameList[i]);
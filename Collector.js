const fs = require('fs');
const path = require('path');

var regex = '\\[\\%([\\w\\s\\/\\\\\.\\:]+)\\%\\]';

function build(file) {
	let filesCode = [];

	if (!fs.existsSync(path.join(__dirname, '/index.html')))
		return;

	let data = fs.readFileSync(path.join(__dirname, '/index.html'), 'utf-8')
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

	let fd = fs.openSync(path.join('result/', file.match('([\\w]+.html)')[1]), 'w');
	fs.writeSync(fd, data);
}

build(path.join(__dirname, '/index.html'));
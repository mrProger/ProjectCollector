const fs = require('fs');
const path = require('path');

module.exports.getAllFiles = function() {
    let filesList = [];

    if (!fs.existsSync(path.join(__dirname, '/../pages')))
		return;
	
	fs.readdirSync(path.join(__dirname, '/../pages')).forEach(file => {
		if (file.endsWith('.html'))
			filesList.push(path.join(__dirname, '/../pages/', file));
	});

    return filesList;
}

module.exports.getFileName = (file, regex) =>
    file.match(regex)[1];

module.exports.createResultDirectory = function() {
	fs.mkdir(path.join(__dirname, '/../result'), err => {
		if (err) {
			console.log(`ERROR > ${err.message}`);
			return;
		}
	});
}

module.exports.build = function(file, filename) {
    let regex = '\\[\\%([\\w\\s\\/\\\\\.\\:]+)\\%\\]';
	let filesCode = [];

	if (!fs.existsSync(file))
		return;

	let data = fs.readFileSync(file, 'utf-8');
	let code = Array.from(data.matchAll(regex));

	for (let i = 0; i < code.length; i++) {
		code[i][1] = code[i][1].trim();

		if (!fs.existsSync(code[i][1])) {
			console.log(`ERROR > ${code[i][1]} not exists`);
			continue;
		}
		
		filesCode.push(fs.readFileSync(code[i][1], 'utf-8'));
	}

	for (let i = 0; i < code.length; i++) {
		if (!filesCode[i])
			continue;

		data = data.replace(code[i][0], filesCode[i]);
	}

	let fd = fs.openSync(path.join(__dirname, '/../result/', filename), 'w');
	fs.writeSync(fd, data);
}
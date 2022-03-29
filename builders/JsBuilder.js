const fs = require('fs');
const path = require('path');

module.exports.createDirectory = function () {
    if (!fs.existsSync(path.join(__dirname, '/../result/js')))
        fs.mkdir(path.join(__dirname, '/../result/js'), err => {
            if (err) {
                console.log(`ERROR > ${err.message}`);
                return false;
            }

            return true;
        });
}

module.exports.getAllFiles = function(file) {
    let filesList = [];

    if (!fs.existsSync(path.join(__dirname, '/../scripts')))
		return;

	fs.readdirSync(path.join(__dirname, '/../scripts')).forEach(file => {
		if (file.endsWith('.js'))
			filesList.push(path.join(__dirname, '/../scripts/', file));
	});

    return filesList;
}

module.exports.getFileName = (file, regex) => 
    file.match(regex)[1];

module.exports.readFiles = function(file, filename) {
    if (!fs.existsSync(file))
        return;
    
    return `/* [${filename}] */\n${fs.readFileSync(file, 'utf-8')}\n`;
}

module.exports.build = function(code) {
    if (!fs.existsSync(path.join(__dirname, '/../result/js')))
		return;

	let fd = fs.openSync(path.join(__dirname, '/../result/js/script.js'), 'w');
	fs.writeSync(fd, code.join('\n'));
}
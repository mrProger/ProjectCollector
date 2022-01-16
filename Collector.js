var fs = require('fs');

var regex = new RegExp('([\\w.]+)|\\/([\\w.]+)');
var blocksCode = [];
var blocksPosition = [];
var indexCode = [];

function writeCodeInFile(dataForWrite) {
    let stream = fs.createWriteStream('result.html');
    
    stream.once('open', function(fd) {
        dataForWrite.forEach((line) => stream.write(line + "\n"));
        stream.end();
    });
}

function writeBlockCodeInArray() {
    let dataForWrite = [];
    
    indexCode.forEach((line) => {
        if (!line.trim().startsWith('[%') && !line.trim().endsWith('%]')) {
            if (blocksPosition.includes(dataForWrite.length))
                for (let i = 0; i < blocksPosition.length; i++)
                    blocksCode[i].forEach((line_) => dataForWrite.push('\t\t' + line_));
            else
                dataForWrite.push(line);
        }
    });
    
    writeCodeInFile(dataForWrite);
}

function readBlockCode(path, position) {
    let data = fs.readFileSync(path).toString().split('\n');
    let code = [];
    
    data.forEach((line) => code.push(line));
    
    blocksCode.push(code);
    blocksPosition.push(position);
}

function readIndexFile(path) {
    let data = fs.readFileSync(path).toString().split('\n');
    let position = 0;
    
    data.forEach((line) => indexCode.push(line));
    
    data.forEach((line) => {
        if (line.trim().startsWith('[%') && line.trim().endsWith('%]'))
            readBlockCode(line.trim().match(regex)[0], position);
        else
            position++;
    });
}

function main() {
    try {
        if (fs.existsSync('index.html'))
            readIndexFile('index.html');
        else
            console.log('File not found');
        
        if (blocksCode.length > 0 && blocksPosition.length > 0)
            writeBlockCodeInArray();
    } catch(err) {
        console.log(err);
    }
}

main();
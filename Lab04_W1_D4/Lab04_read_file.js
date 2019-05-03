const fs = require('fs');

const read = file => {
	if(fs.existsSync(file)){
		let stream = fs.createReadStream(file);
		stream.on('data', chunk => process.send(chunk));
		stream.on('end', _ => process.send(null));
	} else {
		process.send(null);
	}
}
process.on('message', file => {
	read(file);
})
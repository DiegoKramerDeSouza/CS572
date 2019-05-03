const http = require('http');
const {fork} = require('child_process');
const path = require('path');

const server = http.createServer((req, res) => {
	
	res.writeHead(200, {"Content-type": "text/plain"});
	
	const file = path.join(__dirname, req.url);
	const child = fork('Lab04_read_file.js');
	child.send(file);
	child.on('message', txt => {
		if(txt == null) res.end();
		// txt will be a Buffer so a Buffer.from is needed
		else res.write(Buffer.from(txt));
	});
	
});

server.listen(3000, _ => console.log('Started at 127.0.0.1:3000'));
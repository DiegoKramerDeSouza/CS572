const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(req, res){
	let file;
	if(req.url == '/'){
		
		file = fs.readFile(path.join(__dirname + '/ReviewQuiz1.pdf'), 
				function(err, data){
					if(err) throw err;
					console.log(data);
				}
		);
		res.end(file);
		
	} else if(req.url == '/sync') {
		
		file = fs.readFileSync(__dirname + '/ReviewQuiz1.pdf');
		res.end(file);
		
	} else if(req.url == '/stream'){
		
		// Short way 
		fs.createReadStream(__dirname +'/ReviewQuiz1.pdf').pipe(res);
		
		// Long way
		/*
		let stream = fs.createReadStream(__dirname +'/ReviewQuiz1.pdf');
		stream.on('data', 
			chunk => res.write(chunk) ? null : stream.pause()		
		);
		res.on('drain', _ => stream.resume());
		stream.on('end', _ => res.end());
		*/
	} else {
		res.end('No File');
	}
	
});
server.listen(3000, _ => console.log('Started at 127.0.0.1:3000'));
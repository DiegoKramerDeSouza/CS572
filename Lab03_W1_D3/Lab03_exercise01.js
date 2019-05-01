const http = require('http');
const dns = require('dns');

const { promisify } = require('util');
const dnslookup = promisify(dns.resolve4);
const website = 'www.mum.edu';

const server = http.createServer(function(req, res){
	if(req.url == '/1'){
		let address = dns.resolve4(website, (err, addr) => {
			if(err) throw err;
			console.log(addr);
			res.end('Callback --> ' + addr.toString());
		});
	} else if (req.url == '/2'){
		dnslookup(website)
			.then(addr => {
				console.log(addr);
				res.end('Promisify --> ' + addr);
			})
			.catch(err => console.error('ERROR', err));
	} else if(req.url == '/3'){
		(async function asyncDnslookup(){
			try{
				let addr = await dnslookup(website);
				console.log(addr);
				res.end('Async --> ' + addr.toString());
			}catch(err){
				console.error('ERROR', err);
			}
		})();
	}	
	
});
server.listen(3000, _ => console.log('Started at 127.0.0.1:3000'));
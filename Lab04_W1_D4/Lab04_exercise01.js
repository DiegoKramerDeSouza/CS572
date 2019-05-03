const os = require('os');
const {fork} = require('child_process');

(function checkSystem(){
	setImmediate(_ => console.log("Checking your system..."), 0);
	const child = fork('Lab04_system.js');
	child.send('start');
	child.on('message', msg => console.log(msg));
	
})();
const os = require('os');
const systemChecking = function(){
	// Get Amount of RAM in GB
	let ram = os.totalmem() / (1024 * 1024 * 1024);
	ram = Math.round(ram * 100)/100;
	// Get CPUs
	let cpus = os.cpus();
	
	return {RAM: ram, CPUS: cpus};
}
process.on('message', msg => {
	const sys = systemChecking();
	if(sys.RAM < 4) process.send("This app needs at least 4GB of RAM");
	else if(sys.CPUS < 2) process.send("Processor is not supported");
	else process.send("System is checked successfully!");
});

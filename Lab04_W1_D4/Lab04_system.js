const os = require('os');
const {Observable} = require('rxjs');

const systemChecking = function(){
	// Get Amount of RAM in GB
	let ram = os.totalmem() / (1024 * 1024 * 1024);
	ram = Math.round(ram * 100)/100;
	// Get CPUs
	let cpus = os.cpus().length;
	return {RAM: ram, CPUS: cpus};
}
process.on('message', msg => {
	const obs$ = new Observable(obs => {
		const sys = systemChecking();
		if(sys.RAM < 4) obs.error("This app needs at least 4GB of RAM");
		if(sys.CPUS < 2) obs.error("Processor is not supported");
		obs.complete();
	});
	obs$.subscribe(
		null,
		err => process.send(err),
		_ => process.send("System is checked successfully!")
	);
});

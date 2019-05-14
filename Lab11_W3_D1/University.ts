
function print(targetClass: any){
	targetClass.prototype.printIt = function(){
		console.log(this);
	}
	targetClass.prototype.setName = function(name: string) {
		this.name = name;
	}
}

function department(d: string){
	return function(targetClass: any){
		return class {
			t = new targetClass();
			dept = d;
			name = this.t.name;
			printIt() {}
			setName() {}
		}
	}
}

@print
@department('Computer Science')
class University {
	
	constructor(public name: string = 'No name'){}
	printIt() {}
	setName(n: string) {}
}

export {University}



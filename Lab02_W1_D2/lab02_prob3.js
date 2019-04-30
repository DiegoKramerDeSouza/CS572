Array.prototype.even = async function(){
	try{
		let list = await createList(this, val => val % 2 == 0);
		console.log(list);
	}catch{
		console.error("Even Error");
	}
}

Array.prototype.odd = async function(){
	try{
		let list = await createList(this, val => val % 2 != 0);
		console.log(list);
	}catch{
		console.error("Odd Error");
	}
}

const createList = (values, predicate) => {
	return predicate ? values.filter(predicate) : values;
}

console.log('start');
[1,2,3,4,5,6,7,8].even();
[1,2,3,4,5,6,7,8].odd();
console.log('end');
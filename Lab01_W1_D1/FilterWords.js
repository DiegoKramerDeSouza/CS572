// Reactive
const { from } = rxjs;
// Replace listed words using Regular Expressions
String.prototype.filterWords = function(words){
    const regx = new RegExp(words.join("|"), "gi");
    return this.replace(regx, "***");
}
// Create a promise resolving filterWords
const promise = _ => {
    return new Promise(resolve => {
        resolve("This house is nice!".filterWords(["house", "nice"]) + " ---> Promise");
    })
}
// Create async function asyncFilter to call promise
async function asyncFilter(){
    try{
        let filter = await promise();
        console.log("(" + filter + ") ---> Async");
    } catch {
        console.error("Promise Error");
    }
}
console.log("This house is nice!".filterWords(["house", "nice"]));
promise().then(data => console.log(data));
asyncFilter(); 
from(promise()).subscribe(e => console.log("(" + e + ") ---> Observable"));
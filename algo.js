// function algorithmExample(n) {
//     // This function demonstrates a simple algorithm that processes the input
//     // and returns a modified version of it.
//     return n *(n + 1) / 2;
// }

// function algorithmExample2(n) {

//    var data =0;
//    for(let x =0;x<=n;x++){
//        data = data + x;
//    }
//     return data;
// }

// console.log(algorithmExample(5))
// console.log(algorithmExample2(3))

class Ibiso {
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    printIbi(){
        console.log(`My name is ${this.name} and I am ${this.age} years old.`);
    }
}

const ibiso1 = new Ibiso("Ibiso", 25);
ibiso1.printIbi();
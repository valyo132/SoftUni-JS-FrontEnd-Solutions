function solve(input){
    for (let i = 0; i < input.length; i++){
        let reversedStr = input[i].toString().split('').reverse().join('');
        if (input[i].toString() == reversedStr){
            console.log(true);
        } else{
            console.log(false);
        }
    }
}

solve([123, 323, 421, 121]);
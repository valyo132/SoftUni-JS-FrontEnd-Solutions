function solve(input){
    let value = 10;

    for (let i = 1; i < input.length; i++){
        let command = input[i];
        if (command == "soap"){
            value += 10;
        } else if (command == "water"){
            value += value * 0.2;
        } else if (command == "vacuum cleaner"){
            value += value * 0.25;
        } else if (command == "mud"){
            value -= value * 0.1;
        }
    }

    console.log(`The car is ${value.toFixed(2)}% clean.`);
}

solve(['soap', 'soap', 'vacuum cleaner', 'mud', 'soap', 'water']);
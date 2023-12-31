function barista(input){
    class Barista{
        constructor(name, shift){
            this.name = name,
            this.shift = shift
            this.cofees = [];
        }
    }

    let allBaristas = [];

    let number = input.shift();

    for (let i = 0; i < number; i++) {
        let[name, shift, coffees] = input.shift().split(' ');
        let newBarista = new Barista(name, shift);
        newBarista.cofees = coffees.split(',');
        allBaristas.push(newBarista);
    }

    while (input[0] != 'Closed') {
        let [command, ...params] = input.shift().split(' / ');

        switch (command) {
            case 'Prepare':
                prepare(params);
                break;
            case 'Change Shift':
                changeShift(params);
                break;
            case 'Learn':
                learn(params);
                break;
        }
    }

    for (const baristaObj of allBaristas) {
        console.log(`Barista: ${baristaObj.name}, Shift: ${baristaObj.shift}, Drinks: ${baristaObj.cofees.join(', ')}`);
    }

    function learn(items){
        let [barista, newCoffee] = items;
        let baristaObj = allBaristas.find(x => x.name == barista);

        if (baristaObj.cofees.some(x => x == newCoffee)){
            console.log(`${barista} knows how to make ${newCoffee}.`);
        } else{
            baristaObj.cofees.push(newCoffee);
            console.log(`${barista} has learned a new coffee type: ${newCoffee}.`);
        }
    }

    function changeShift(items){
        let [barista, newShift] = items;

        let baristaObj = allBaristas.find(x => x.name == barista);

        baristaObj.shift = newShift;
        console.log(`${barista} has updated his shift to: ${newShift}`);
    }

    function prepare(items){
        let [barista, shift, coffeType] = items;

        let baristaObj = allBaristas.find(x => x.name == barista);

        if (baristaObj.shift == shift && baristaObj.cofees.some(x => x == coffeType)){
            console.log(`${barista} has prepared a ${coffeType} for you!`);
        } else{
            console.log(`${barista} is not available to prepare a ${coffeType}.`);
        }
    }
}

barista(['4',
'Alice day Espresso,Cappuccino',
'Bob night Latte,Mocha',
'Carol day Americano,Mocha',
'David night Espresso',
'Prepare / Alice / day / Espresso',
'Change Shift / Bob / day',
'Learn / Carol / Latte',
'Prepare / Bob / night / Latte',
'Learn / David / Cappuccino',
'Prepare / Carol / day / Cappuccino',
'Change Shift / Alice / night',
 'Learn / Bob / Mocha',
'Prepare / David / night / Espresso',
'Closed']
    );
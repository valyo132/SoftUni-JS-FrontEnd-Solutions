function adventure(input){
    let allAstounats = {};

    let number = input.shift();

    for (let i = 0; i < number; i++) {
        let [name, oxygenLevel, energyReserve] = input.shift().split(' ');
        allAstounats[name] = {oxygenLevel: Number(oxygenLevel), energyReserve: Number(energyReserve)};
    }

    while (input[0] != 'End') {
        let [command, astrounatName, item] = input.shift().split(' - ');

        switch (command) {
            case 'Explore':
                explore(astrounatName, item);
                break;
            case 'Refuel':
                refuel(astrounatName, item);
                break;
            case 'Breathe':
                breathe(astrounatName, item);
                break;
        }
    }

    for (const [objKey, astounatObj] of Object.entries(allAstounats)) {
        console.log(`Astronaut: ${objKey}, Oxygen: ${astounatObj.oxygenLevel}, Energy: ${astounatObj.energyReserve}`);
    }

    function breathe(astrounatName, amount){
        if (allAstounats[astrounatName].oxygenLevel + Number(amount) > 100){
            amount = 100 - allAstounats[astrounatName].oxygenLevel;
        }
        allAstounats[astrounatName].oxygenLevel += Number(amount);

        console.log(`${astrounatName} took a breath and recovered ${amount} oxygen!`);
    }

    function refuel(astrounatName, amount){
        if (allAstounats[astrounatName].energyReserve + Number(amount) > 200){
            amount = 200 - allAstounats[astrounatName].energyReserve;
        }
        allAstounats[astrounatName].energyReserve += Number(amount);

        console.log(`${astrounatName} refueled their energy by ${amount}!`);
    }

    function explore(astrounatName, energyNeeded){
        if (allAstounats[astrounatName].energyReserve >= Number(energyNeeded)){
            allAstounats[astrounatName].energyReserve -= Number(energyNeeded);
            console.log(`${astrounatName} has successfully explored a new area and now has ${allAstounats[astrounatName].energyReserve} energy!`);
        } else{
            console.log(`${astrounatName} does not have enough energy to explore!`);
        }
    }
}

adventure([ '1',
'Alice 60 20',
'Explore - Alice - 50',
'End']
);
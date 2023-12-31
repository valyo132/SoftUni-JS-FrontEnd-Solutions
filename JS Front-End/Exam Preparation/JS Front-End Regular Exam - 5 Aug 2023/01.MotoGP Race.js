function race(input){
    let number = input.shift();

    let allRiders = {};

    for (let i = 0; i < number; i++) {
        let [rider, fuelCapacity, position] = input.shift().split('|');
        allRiders[rider] = {fuelCapacity, position};
    }

    while(true){
        let line = input.shift();
        if (line == 'Finish'){
            break;
        }

        if (line.includes('StopForFuel')){
            fuelStop(line);
        } else if (line.includes('Overtaking')){
            overtaking(line);
        } else if (line.includes('EngineFail')){
            engineFailure(line);
        }
    }

    for (const [riderName, riderObj] of Object.entries(allRiders)) {
        console.log(`${riderName}`);
        console.log(`  Final position: ${riderObj.position}`);
    }
    
    function engineFailure(line){
        let [rider, lapsLeft] = line.split(' - ').splice(1);
        delete allRiders[rider];
        console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
    }

    function overtaking(line){
        let [rider1, rider2] = line.split(' - ').splice(1);

        if (allRiders[rider1].position < allRiders[rider2].position){
            console.log(`${rider1} overtook ${rider2}!`);
            let riderOnePosition = allRiders[rider1].position;
            allRiders[rider1].position = allRiders[rider2].position;
            allRiders[rider2].position = riderOnePosition;
        }
    }

    function fuelStop(line){
        let [rider, minimumFuel, changedPosition] = line.split(' - ').splice(1);
        if (allRiders[rider].fuelCapacity < Number(minimumFuel)){
            allRiders[rider].fuelCapacity = 100;
            allRiders[rider].position = changedPosition;
            console.log(`${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`);
        } else{
            console.log(`${rider} does not need to stop for fuel!`);
        }
    }
}

race((["3",
"Valentino Rossi|100|1",
"Marc Marquez|90|2",
"Jorge Lorenzo|80|3",
"StopForFuel - Valentino Rossi - 50 - 1",
"Overtaking - Marc Marquez - Jorge Lorenzo",
"EngineFail - Marc Marquez - 10",
"Finish"])
)
function solve(input) {
    let garages = {};
    for (const line of input) {
        let [garage, carInfo] = line.split(' - ');
        if (!garages.hasOwnProperty(garage)) {
            garages[garage] = [];
        }
        garages[garage].push(carInfo);
    }
    let output = '';
    Object.entries(garages).sort((a, b) => a[0] - b[0]).forEach(([garage, cars]) => {
        output += `Garage № ${garage}\n`;
        for (let currCar of cars) {
            currCar = currCar.replace(/: /g, ' - ');
            output += `--- ${currCar}\n`;
        }
    });
    console.log(output);
}

solve(['1 - color: blue, fuel type: diesel',
 '1 - color: red, manufacture: Audi', '2 - fuel type: petrol',
 '4 - color: dark blue, fuel type: diesel, manufacture: Fiat']);
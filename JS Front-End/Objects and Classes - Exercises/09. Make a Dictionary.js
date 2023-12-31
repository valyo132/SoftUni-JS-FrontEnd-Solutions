function solve(input){
    let items = {};

    input.forEach(el => {
        let obj = JSON.parse(el);
        let key = Object.keys(obj)[0];
        let value = Object.values(obj)[0];
        if (!items.hasOwnProperty(key)){
            items[key] = value;
        } else{
            items[key] = value;
        }
    });

    let sorted = Object.entries(items);
    sorted = sorted.sort((a, b) => a[0].localeCompare(b[0]));

    for (const obj of sorted) {
        console.log(`Term: ${obj[0]} => Definition: ${obj[1]}`);
    }
}

solve([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
    ]
    );
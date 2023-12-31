function solve(input){
    let flightsSectors = input[0];
    let newStatuses = input[1];
    let targetStatus = input[2];

    let result = [];

    if (targetStatus == "Ready to fly"){
        flightsSectors.forEach(element => {
            let flight = element.split(' ')[0];
            let destination = element.split(' ').splice(1).join(' ');
            let changedStatuses = "";
            newStatuses.forEach(el => {
                let [targetFlight, status] = el.split(' ');
                changedStatuses += `${targetFlight}`;
            });
            if (!changedStatuses.includes(flight)){
                result.push({Destination: destination, Status: "Ready to fly"});
            }
        });
    } else {
        flightsSectors.forEach(element => {
            let [flight, destination] = element.split(' ');
            newStatuses.forEach(el => {
                let [targetFlight, status] = el.split(' ');

                if (flight === targetFlight){
                    result.push({Destination: destination, Status: status});
                }
            });
        });
    };

    for (const obj of result) {
        console.log(obj);
    }
}

// solve([
//     ['WN269 Delaware',
// 'FL2269 Oregon',
//  'WN498 Las Vegas',
//  'WN3145 Ohio',
//  'WN612 Alabama',
//  'WN4010 New York',
//  'WN1173 California',
//  'DL2120 Texas',
//  'KL5744 Illinois',
//  'WN678 Pennsylvania'],
//  ['DL2120 Cancelled',
//  'WN612 Cancelled',
//  'WN1173 Cancelled',
//  'SK430 Cancelled'],
//  ['Cancelled']
// ]
// );

console.log('---------------');

solve([
    ['WN269 Delaware',
'FL2269 Oregon',
 'WN498 Las Vegas',
 'WN3145 Ohio',
 'WN612 Alabama',
 'WN4010 New York',
 'WN1173 California',
 'DL2120 Texas',
 'KL5744 Illinois',
 'WN678 Pennsylvania'],
 ['DL2120 Cancelled',
 'WN612 Cancelled',
 'WN1173 Cancelled',
 'SK330 Cancelled'],
 ['Ready to fly']
]
);
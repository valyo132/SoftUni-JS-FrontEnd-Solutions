function solve(input){
    let parkingLot = [];

    input.forEach(el => {
        let [direction, carNumber]  = el.split(', ');
        if (direction === "IN" && !parkingLot.includes(carNumber)){
            parkingLot.push(carNumber);
        } else if (direction === "OUT" && parkingLot.includes(carNumber)){
            let indexToRemove = parkingLot.indexOf(carNumber);
            parkingLot.splice(indexToRemove, 1);
        }
    });

    if (parkingLot.length > 0){
        let sorted = parkingLot.sort((a, b) => a.localeCompare(b));
        console.log(sorted.join('\n'));
    } else{
        console.log("Parking Lot is Empty");
    }
}

solve(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'IN, CA9999TT',
'IN, CA2866HI',
'OUT, CA1234TA',
'IN, CA2844AA',
'OUT, CA2866HI',
'IN, CA9876HH',
'IN, CA2822UU']
);
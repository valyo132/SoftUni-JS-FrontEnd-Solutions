function solve(input){
    for (const line of input) {
        let [town, latitude, longitude] = line.split(' | ');
        let obj = {};
        obj['town'] = town;
        obj['latitude'] = Number(latitude).toFixed(2);
        obj['longitude'] = Number(longitude).toFixed(2);
        console.log(obj);
    }
}

solve(['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']
);
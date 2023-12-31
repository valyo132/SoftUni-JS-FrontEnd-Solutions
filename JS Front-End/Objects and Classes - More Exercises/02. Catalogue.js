function solve(input){
    let catalogue = {};

    input.forEach(element => {
        let item = element.split(' : ')[0];
        let price = Number(element.split(' : ')[1]);
        let key = item[0];

        if (!catalogue.hasOwnProperty(key)){
            catalogue[key] = [];
        }
        catalogue[key].push({item, price});
        
    });

    let sorted = Object.entries(catalogue).sort();

    for (const [key, arr] of sorted) {
        console.log(key);
        arr.sort((a, b) => a.item.localeCompare(b.item));
        arr.forEach(el => {
            console.log(`  ${el.item}: ${el.price}`);
        });
    }
}

solve([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
    ]
    );
function solve(arr1, arr2){
    let products = {};

    for (let i = 0; i < arr1.length -1; i += 2){
        let product = arr1[i];
        let quantity = Number(arr1[i + 1]);
        products[product] = quantity;
    }

    for (let i = 0; i < arr2.length -1; i += 2){
        let product = arr2[i];
        let quantity = Number(arr2[i + 1]);
        if (products.hasOwnProperty(product)){
            products[product] += quantity;
        } else {
            products[product] = quantity;
        }
    }

    for (const [item, quantity] of Object.entries(products)) {
        console.log(`${item} -> ${quantity}`);
    }
}

solve([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
    'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ]
    );
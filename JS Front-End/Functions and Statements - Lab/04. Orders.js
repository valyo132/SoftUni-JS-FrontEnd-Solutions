function solve(item, quantity){
    let total = 0;
    if (item == "coffee"){
        total = 1.5 * quantity;
    } else if (item == "water"){
        total = 1.00 * quantity;
    }else if (item == "coke"){
        total = 1.40 * quantity;
    }else if (item == "snacks"){
        total = 2.00 * quantity;
    }

    console.log(total.toFixed(2));
}

solve("water", 5);
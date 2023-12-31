function gladiatorExpenses(losses, helmetPrice, swordPrice, shieldPrice, armorPrice){
    let totalExpenses = 0;
    let shieldBreaks = 0;

    for (let i = 1; i <= losses; i++){

        let isHelmetBroken = false;
        let isSwordBroken = false;

        if (i % 2 == 0){
            isHelmetBroken = true;
            totalExpenses += helmetPrice;
        }
        if (i % 3 == 0){
            isSwordBroken = true;
            totalExpenses += swordPrice;
        }

        if (isHelmetBroken && isSwordBroken){
            totalExpenses += shieldPrice;
            shieldBreaks++;
        }

        if (shieldBreaks % 2 == 0 && shieldBreaks != 0){
            totalExpenses += armorPrice;
            shieldBreaks = 0;
        }
    }

    console.log(`Gladiator expenses: ${totalExpenses.toFixed(2)} aureus`);
}

gladiatorExpenses(23, 12.50, 21.50, 40, 200);
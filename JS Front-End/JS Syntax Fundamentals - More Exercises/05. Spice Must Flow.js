function spiceFlow(initialSpice){
    let totalSpice = 0;
    let days = 0;

    while (initialSpice >= 100){
        totalSpice += initialSpice

        if (totalSpice >= 26)
            totalSpice -= 26;

        initialSpice -= 10;
        days++;
    }

    if (totalSpice >= 26)
            totalSpice -= 26;

    console.log(days);
    console.log(totalSpice);
}

spiceFlow(111);
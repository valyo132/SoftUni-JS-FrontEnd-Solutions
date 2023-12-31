function solve(num){
    if (num == 100){
        console.log("100% Complete!");
        return;
    }

    let firstDigit = num.toString().split('')[0];

    console.log(`${num}% [${'%'.repeat(firstDigit)}${'.'.repeat(10 - firstDigit)}]`);
    console.log("Still loading...")
}

solve(99);
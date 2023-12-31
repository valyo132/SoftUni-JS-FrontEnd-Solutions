function solve(num1, num2){
    let firstDigitFact = 1;
    let secondDigitFact = 1;

    for (let i = 1; i <= num1; i++){
        firstDigitFact *= i;
    }
    for (let i = 1; i <= num2; i++){
        secondDigitFact *= i;
    }

    console.log((firstDigitFact / secondDigitFact).toFixed(2));
}

solve(5, 2);
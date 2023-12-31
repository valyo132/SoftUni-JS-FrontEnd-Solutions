function solve(num1, num2, num3){
    let negativeCounter = 0;
    if (num1 < 0) negativeCounter++;
    if (num2 < 0) negativeCounter++;
    if (num3 < 0) negativeCounter++;

    if (negativeCounter % 2 == 1){
        console.log("Negative");
    } else{
        console.log("Positive");
    }
}
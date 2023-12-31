function largestNumber(num1, num2, num3){
    let result = num1;
    if (num2 > result)
        result = num2;
    if (num3 > result)
        result = num3;

    console.log(`The largest number is ${result}.`);
}

largestNumber(5, -3, 16);
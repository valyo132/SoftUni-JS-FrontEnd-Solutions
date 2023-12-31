function solve(num){
    let charArr = num.toString().split('');
    let oddSum = 0;
    let evenSum = 0;

    for (let i = 0; i < charArr.length; i++){
        if (Number(charArr[i]) % 2 == 0){
            evenSum += Number(charArr[i]);
        } else{
            oddSum += Number(charArr[i]);
        }
    }

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

solve(3495892137259234);
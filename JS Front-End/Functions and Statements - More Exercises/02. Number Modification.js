function solve(number){
    let average = 0;

    while (average <= 5){
        let arr = number.toString().split('');
        for (let i = 0; i < arr.length; i++){
            average += Number(arr[i]);
        }
        average /= number.toString().split('').length;

        if (average <= 5)
            number += '9';
    }

    console.log(number);
}

solve(101);
function solve(str, target){
    let arr = str.split(" ");
    let result = 0;
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == target){
            result++;
        }
    }

    console.log(result);
}

solve('This is a word and it also is a sentence',
'is'
);
function solve(input){
    let result = [];

    input.forEach(el => {
        let currentArray = JSON.parse(el);
        currentArray = currentArray.sort((a, b) => b - a);
        let isDuplicate = false;

        if (result.length > 0){
            result.forEach(x => {
                if (x.toString() == currentArray.toString()){
                    isDuplicate = true;
                }
            });
        }

        if (!isDuplicate){
            result.push(currentArray);
        }
    });

    result.sort((a, b) => a.length - b.length);
    result.forEach(arr => console.log('[' + arr.join(', ') + ']'));
}

solve(["[7.14, 7.180, 7.339, 80.099]",
"[7.339, 80.0990, 7.140000, 7.18]",
"[7.339, 7.180, 7.14, 80.099]"]

);
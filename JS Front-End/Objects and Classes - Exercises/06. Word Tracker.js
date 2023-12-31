function solve(input){
    let list = input.shift().split(' ');
    let sentence = input[1];
    let result = {};
    list.forEach(el => {
        result[el] = 0;

        input.forEach(word => {
            if (word === el){
                result[el]++;
            }
        })
    });

    Object.entries(result)
        .sort((a, b) => b[1] - a[1])
        .forEach(el => {
        console.log(`${el[0]} - ${el[1]}`);
    })
}

solve([
    'is the', 
    'first', 'sentence', 'Here', 'is', 'another', 'the', 'And', 'finally', 'the', 'the', 'sentence']
    
    );
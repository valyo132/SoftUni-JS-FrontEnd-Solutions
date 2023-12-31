function solve(str){
    let arr = str.toLowerCase().split(' ');

    let map = new Map();

    arr.forEach((element) => {
        if (map.has(element)){
            let oldValue = map.get(element);
            let newValue = oldValue + 1;

            map.set(element, newValue);
        } else {
            map.set(element, 1);
        }
    });

    let result = [];

    map.forEach((value, item) => {
        if (value % 2 !== 0){
            result.push(item);
        }
    });

    console.log(result.join(' '));
}

solve('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');
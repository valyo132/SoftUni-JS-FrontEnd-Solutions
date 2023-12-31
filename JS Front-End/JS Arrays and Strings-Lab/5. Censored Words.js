function solve(str, target){
    console.log(str.replace(target, '*'.repeat(target.length)));
}

solve('A small sentence with some words', 'some');;
function solve(input){
    let people = {};
    for (const name of input) {
        people[name] = name.length;
        console.log(`Name: ${name} -- Personal Number: ${name.length}`);
    }
}

solve([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
    ]
    );
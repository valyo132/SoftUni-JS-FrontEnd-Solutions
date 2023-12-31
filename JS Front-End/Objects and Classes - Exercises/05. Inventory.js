function solve(input){
    let allHores = [];

    input.forEach(el => {
        let [name, level, items] = el.split(' / ');
        allHores.push({
            name: name,
            level: Number(level),
            items: items
        });
    });

    allHores.sort((a, b) => a.level - b.level);
    allHores.forEach(hero => {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items}`);
    })
}

solve([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
    ]
    );
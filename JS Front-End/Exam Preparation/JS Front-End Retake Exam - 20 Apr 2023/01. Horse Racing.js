function racing(input){
    let allHorses = [];

    input.shift().split('|').forEach(element => {
        allHorses.push(element);
    });

    while (input[0] != 'Finish') {
        let [command, ...items] = input.shift().split(' ');

        switch (command) {
            case 'Retake':
                retake(items);
                break;
            case 'Trouble':
                trouble(items);
                break;
            case 'Rage':
                rage(items);
                break;
            case 'Miracle':
                miracle();
                break;
        }
    }

    console.log(allHorses.join('->'));
    console.log(`The winner is: ${allHorses.reverse()[0]}`);

    function miracle(){
        let lastHorse = allHorses.shift();
        allHorses.push(lastHorse);
        console.log(`What a miracle - ${lastHorse} becomes first.`)
    }

    function rage(items){
        let horseName = items[0];
        var index = allHorses.indexOf(horseName);

        if (index == allHorses.length - 2) {
            allHorses.splice(allHorses.length - 1, 0, allHorses.splice(allHorses.length - 2, 1)[0]);
        } else {
            allHorses.splice(index + 2, 0, allHorses.splice(index, 1)[0]);
        }

        console.log(`${horseName} rages 2 positions ahead.`);
    }
    
    function trouble(items){
        let horseIndex = allHorses.indexOf(items[0]);

        if (horseIndex > 0){
            let winningHorse = allHorses[horseIndex - 1];
            let loosingHorse = allHorses[horseIndex];

            allHorses[horseIndex - 1] = loosingHorse;
            allHorses[horseIndex] = winningHorse;

            console.log(`Trouble for ${loosingHorse} - drops one position.`);
        }
    }

    function retake(items){
        let overtakingIndex = allHorses.indexOf(items[0]);
        let overtakenIndex = allHorses.indexOf(items[1]);

        if ( overtakingIndex < overtakenIndex){
            let overtakingHorse = allHorses[overtakingIndex];
            let overtakenHorse = allHorses[overtakenIndex];

            allHorses[overtakingIndex] = overtakenHorse;
            allHorses[overtakenIndex] = overtakingHorse;

            console.log(`${overtakingHorse} retakes ${overtakenHorse}.`);
        }
    }
}

racing((['Bella|Alexia|Sugar',
'Retake Alexia Sugar',
'Rage Bella',
'Trouble Bella',
'Finish'])

);
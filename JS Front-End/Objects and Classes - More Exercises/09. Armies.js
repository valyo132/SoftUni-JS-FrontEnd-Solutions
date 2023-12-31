function solve(input) {
    class Leader {
        constructor(name) {
            this.name = name;
            this.army = [];
        }
    
        get totalArmyCount() {
            return this.army.reduce((totalCount, army) => totalCount + army.count, 0);
        }
    }
    
    class Army {
        constructor(name, count) {
            this.name = name;
            this.count = Number(count);
        }
    }
    
    let leaders = [];
    let armies = [];

    input.forEach(el => {
        if (el.includes('arrives')){
            let leaderName = el.split(' arrives')[0];
            let newLeader = new Leader(leaderName);
            leaders.push(newLeader);
        } else if (el.includes(': ')){
            let leaderName = el.split(': ')[0];

            if (leaders.some(x => x.name == leaderName)){
                let [armyName, armyCount] = el.split(': ').splice(1).join(' ').split(', ');
                let newArmy = new Army(armyName, armyCount);
                let leaderObj = leaders.find((x) => x.name == leaderName);
                leaderObj.army.push(newArmy);
                armies.push(newArmy);
            }
        } else if (el.includes('+')){
            let [armyName, armyCount] = el.split(' + ');

            if (armies.some(x => x.name == armyName)){
                let armyObj = armies.find((x) => x.name == armyName);
                armyObj.count += Number(armyCount);
            }
        } else if (el.includes('defeated')){
            let leaderName = el.split(' defeated')[0];

            if (leaders.some(x => x.name == leaderName)){
                let index = leaders.findIndex((x) => x.name == leaderName);
                leaders.splice(index, 1);
            }
        }
    });

    leaders.sort((a, b) => b.totalArmyCount - a.totalArmyCount);

    for (const leader of leaders) {
        let totalArmyCount = leader.totalArmyCount;
        console.log(`${leader.name}: ${totalArmyCount}`);
        leader.army.sort((a,b) => b.count - a.count);
        for (const army of leader.army) {
            console.log(`>>> ${army.name} - ${army.count}`);
        }
    }
}

solve(['Rick Burr arrives', 'Findlay arrives', 'Rick Burr: Juard, 1500', 'Wexamp arrives', 'Findlay: Wexamp, 34540', 'Wexamp + 340', 'Wexamp: Britox, 1155', 'Wexamp: Juard, 43423']);


//     Write a function that stores information about an army leader and his armies. The input will be an array of strings. The strings can be in some of the following formats:
// "{leader} arrives" – add the leader (no army)
// "{leader}: {army name}, {army count}" – add the army with its count to the leader (if he exists)
// "{army name} + {army count}" – if the army exists somewhere add the count
// "{leader} defeated" – delete the leader and his army (if he exists)
// When finished reading the input sort the leaders by total army count in descending. Then each army should be sorted by count in descending.
// Output
// Print in the following format:
// "{leader one name}: {total army count}
// >>> {armyOne name} - {army count}
// >>> {armyTwo name} - {army count}
//  …
// {leader two name}: {total army count}
// …"
// Constrains
// •	The new leaders will always be unique
// •	When adding a new army to the leader, the army will be unique

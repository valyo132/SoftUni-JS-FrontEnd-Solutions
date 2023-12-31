function solve(input){
    let meetings = {};
    for (const line of input) {
       let [day, name] = line.split(' ');
       if (meetings.hasOwnProperty(day)){
        console.log(`Conflict on ${day}!`);
       } else{
        console.log(`Scheduled for ${day}`);
        meetings[day] = name;
       }
    }

    for (const [day, name] of Object.entries(meetings)) {
        console.log(`${day} -> ${name}`);
    }
}

solve(['Monday Peter',
'Wednesday Bill',
'Monday Tim',
'Friday Tim']
);
function solve(inputObj, inputArr) {
    inputArr.forEach(command => {
        let currentCommand = command.split(' ')[0];
        let site = command.split(' ').splice(1).join(' ');

        if (currentCommand == "Open") {
            inputObj['Open Tabs'].push(site);
            inputObj["Browser Logs"].push(command);
        } else if (currentCommand == "Close" && inputObj["Open Tabs"].includes(site)) {
            let index = inputObj["Open Tabs"].indexOf(site);
            inputObj["Open Tabs"].splice(index, 1);
            inputObj["Recently Closed"].push(site);
            inputObj["Browser Logs"].push(command);
        } else if (currentCommand == "Clear"){
            inputObj['Open Tabs'] = [];
            inputObj['Recently Closed'] = [];
            inputObj['Browser Logs'] = [];
        } 
    });

    console.log(inputObj['Browser Name']);
    console.log(`Open Tabs: ${inputObj["Open Tabs"].join(', ')}`);
    console.log(`Recently Closed: ${inputObj["Recently Closed"].join(', ')}`);
    console.log(`Browser Logs: ${inputObj["Browser Logs"].join(', ')}`);
}

solve({"Browser Name":"Mozilla Firefox",
"Open Tabs":["YouTube"],
"Recently Closed":["Gmail", "Dropbox"],
"Browser Logs":["Open Gmail", "Close Gmail", "Open Dropbox", "Open YouTube", "Close Dropbox"]},
["Open Wikipedia", "Clear History and Cache", "Open Twitter", "Close Twitter", "Close Twitter"]

)
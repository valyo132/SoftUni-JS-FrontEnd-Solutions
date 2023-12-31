function shoppingList(input){
    let initialList = input[0].split('!');
    let commands = input.splice(1);
    let startIndex = -1;

    while (commands[++startIndex] != 'Go Shopping!'){
        let [currentCommand, ...items] = commands[startIndex].split(' ');

        switch (currentCommand) {
            case 'Urgent':
                let [itemToAdd] = items;

                if (!initialList.includes(itemToAdd)){
                    initialList.unshift(itemToAdd);
                }
                break;
            case 'Unnecessary':
                let [itemToRemove] = items;

                if (initialList.includes(itemToRemove)){
                    let index = initialList.indexOf(itemToRemove);
                    initialList.splice(index, 1);
                }
                break;
            case 'Correct':
                let [oldItem, newItem] = items;
                if (initialList.includes(oldItem)){
                    let index = initialList.indexOf(oldItem);
                    initialList[index] = newItem
                }
                break;
            case 'Rearrange':
                let [itemToRerrange] = items;
                if (initialList.includes(itemToRerrange)){
                    let index = initialList.indexOf(itemToRerrange);
                    initialList.splice(index, 1);
                    initialList.push(itemToRerrange);
                }
                break;
        }
    }

    console.log(initialList.join(', '));
}

shoppingList((["Milk!Pepper!Salt!Water!Banana",
"Urgent Salt",
"Unnecessary Milk",
"Correct Pepper Onion",
"Rearrange Grapes",
"Correct Tomatoes Potatoes",
"Go Shopping!"])

);
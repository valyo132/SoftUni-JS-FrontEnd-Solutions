function thePianist(input) {
    let allPieces = {};

    let numberOfPieces = input[0];

    for (let i = 1; i <= numberOfPieces; i++) {
        let [name, composer, key] = input[i].split('|');
        allPieces[name] = {composer, key};
    }

    while(true){
        let currentInputValue = input[++numberOfPieces];
        if (currentInputValue.includes('Stop')){
            break;
        }

        let [command, ...peiceItems] = input[numberOfPieces].split('|');

        switch (command) {
            case 'Add':
                let [name, composer, key] = peiceItems;

                if (allPieces.hasOwnProperty(name)){
                    console.log(`${name} is already in the collection!`);
                } else{
                    allPieces[name] = {composer, key};
                    console.log(`${name} by ${composer} in ${key} added to the collection!`);
                }
                break;
            case 'Remove':
                let pieceToRemove = peiceItems[0];

                if (allPieces.hasOwnProperty(pieceToRemove)){
                    delete allPieces[pieceToRemove];
                    console.log(`Successfully removed ${pieceToRemove}!`);
                } else {
                    console.log(`Invalid operation! ${pieceToRemove} does not exist in the collection.`);
                }
                break;
            case 'ChangeKey':
                let [priceToChange, newKey] = peiceItems;

                if (allPieces.hasOwnProperty(priceToChange)){
                    allPieces[priceToChange].key = newKey;
                    console.log(`Changed the key of ${priceToChange} to ${newKey}!`);
                } else {
                    console.log(`Invalid operation! ${priceToChange} does not exist in the collection.`);
                }
                break;
        }
    }

    for (const [pieceKey, pieceObj] of Object.entries(allPieces)) {
        console.log(`${pieceKey} -> Composer: ${pieceObj.composer}, Key: ${pieceObj.key}`);
    }
}

thePianist(
[
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'  
  ]
);
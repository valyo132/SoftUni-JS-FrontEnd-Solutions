function solve(input) {
    class Shelf{
        constructor(id, genre){
            this.id = id;
            this.genre = genre;
            this.books = [];
        }
    }

    class Book{
        constructor(title, author, genre){
            this.title = title;
            this.author = author;
            this.genre = genre;
        }
    }

    let takenIds = [];
    let allShelfs = [];

    let regex = /([^:]+): ([^,]+), (.+)/;

    input.forEach(el => {
        if (el.includes('->')){
            let [id, genre] = el.split(' -> ');
            if (!takenIds.some(x => x == id)){
                allShelfs.push(new Shelf(id, genre));
                takenIds.push(id);
            }
        } else if(el.includes(':')){
            let match = el.match(regex);

            if (match){
                let bookTitle = match[1];
                let bookAuthor = match[2];
                let bookGenre = match[3];

                if (allShelfs.some(x => x.genre == bookGenre)){
                    let shelfObj = allShelfs.find(x => x.genre == bookGenre);
                    shelfObj.books.push(new Book(bookTitle, bookAuthor, bookGenre));
                }
            }
        }
    });

    let sortedShelf = allShelfs.sort((a, b) => b.books.length - a.books.length);

    for (const shelf of sortedShelf) {
        console.log(`${shelf.id} ${shelf.genre}: ${shelf.books.length}`);
        let sortedBooks = shelf.books.sort((a, b) => a.title.localeCompare(b.title));
        for (const book of sortedBooks) {
            console.log(`--> ${book.title}: ${book.author}`);
        }
    }
}

solve(['1 -> history',
    '1 -> action',
    'Death in Time: Criss Bell, mystery',
    '2 -> mystery', '3 -> sci-fi',
    'Child of Silver: Bruce Rich, mystery',
    'Hurting Secrets: Dustin Bolt, action',
    'Future of Dawn: Aiden Rose, sci-fi',
    'Lions and Rats: Gabe Roads, history',
    '2 -> romance', 'Effect of the Void: Shay B, romance',
    'Losing Dreams: Gail Starr, sci-fi',
    'Name of Earth: Jo Bell, sci-fi',
    'Pilots of Stone: Brook Jay, history'])

// Write a function that stores information about shelves and the books on the shelves.
// Each shelf has an Id and a genre of books that can be on it.

// Each book has a title, an author, and a genre. The input comes as an array of strings. They will be in the format:
// "{shelf id} -> {shelf genre}" – create a shelf if the id is not taken.
// "{book title}: {book author}, {book genre}" – if a shelf with that genre exists, add the book to the shelf.
// After finishing reading input, sort the shelves by a count of books in it in descending.

//For each shelf sort the books by title in ascending. Then print them in the following format.
// "{shelfOne id} {shelf genre}: {books count}
// --> {bookOne title}: {bookOne author}
// --> {bookTwo title}: {bookTwo author}
// …
// {shelfTwo id} {shelf genre}: {books count}

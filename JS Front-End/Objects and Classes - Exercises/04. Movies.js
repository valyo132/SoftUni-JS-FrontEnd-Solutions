function solve(input){
    let allMovies = [];

    for (const line of input) {
        if (line.includes("addMovie")){
            let movieName = line.split("addMovie ")[1];
            allMovies.push({name: movieName});
        } else if (line.includes("directedBy")){
            let [movieName, director] = line.split(' directedBy ');
            let search = allMovies.find((el) => el.name == movieName);
            if (search){
                search['director'] = director;
            }
        } else if (line.includes('onDate')){
            let [movieName, date] = line.split(' onDate ');
            let search = allMovies.find((el) => el.name == movieName);
            if(search){
                search['date'] = date;
            }
        }
    }

    allMovies.forEach((movie) => {
        if (movie.name && movie.date && movie.director){
            console.log(JSON.stringify(movie));
        }
    })
}

solve([
    'addMovie The Avengers',
    'addMovie Superman',
    'The Avengers directedBy Anthony Russo',
    'The Avengers onDate 30.07.2010',
    'Captain America onDate 30.07.2010',
    'Captain America directedBy Joe Russo'
    ]
    
    );
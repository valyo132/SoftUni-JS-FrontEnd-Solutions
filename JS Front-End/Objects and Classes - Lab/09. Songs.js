function solve(input){
    class Song{
        constructor(typeList, name, time){
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

    let songs = [];
    let count = input[0];
    for (let i = 1; i <= count; i++){
        let [typeList, name, time] = input[i].split('_');
        songs.push(new Song(typeList, name, time));
    }
    let target = input[input.length - 1];

    for (const song of songs) {
        if (song.typeList == target || target == "all"){
            console.log(song.name);
        }
    }
}

solve([3,
    'favourite_DownTown_3:14',
    'favourite_Kiss_4:16',
    'favourite_Smooth Criminal_4:01',
    'favourite']
    );
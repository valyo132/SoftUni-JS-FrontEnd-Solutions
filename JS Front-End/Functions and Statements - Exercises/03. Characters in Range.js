function solve(char1, char2){
    var startCode = char1.charCodeAt(0);
  var endCode = char2.charCodeAt(0);

  if (startCode > endCode) {
    var temp = startCode;
    startCode = endCode;
    endCode = temp;
  }

  let result ="";

    for (let i = startCode + 1; i < endCode; i++){
        result += String.fromCharCode(i) + " ";
    }

    console.log(result);
}

solve('a', 'd');
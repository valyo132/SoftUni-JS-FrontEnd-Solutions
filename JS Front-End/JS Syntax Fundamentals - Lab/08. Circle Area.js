function circleArea(item){
    let inputType = typeof(item);
    let result;

    if (inputType == 'number'){
        result = Math.pow(item, 2) * Math.PI;
        console.log(result.toFixed(2));
    } else{
        console.log(`We can not calculate the circle area, because we receive a ${inputType}.`);
    }
}
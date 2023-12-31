function solve(num1, num2, func){
    if (func == "multiply"){
        console.log(num1 * num2);
    } else if (func == "divide"){
        console.log(num1 / num2);
    }else if (func == "add"){
        console.log(num1 + num2);
    }else if (func == "subtract"){
        console.log(num1 - num2);
    }
}

solve(5,10,"multiply");
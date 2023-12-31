function solve(pass){
    var alphanumericRegex = /^[0-9a-zA-Z]+$/;
    var digitRegex = /\d/g;
    let valid = true;

    if (pass.length < 6 || pass.length > 10){
        console.log("Password must be between 6 and 10 characters");
        valid = false;
    }
    if (!alphanumericRegex.test(pass)){
        console.log("Password must consist only of letters and digits");
        valid = false;
    }
    if (pass.match(digitRegex) < 2){
        console.log("Password must have at least 2 digits");
        valid = false;
    }

    if (valid){
        console.log("Password is valid");
    }
}

solve("Pass123   ");
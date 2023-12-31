function cinemaCalc(day, age){
    let result;
    switch (day){
        case "Weekday":
            if (age >= 0 && age <= 18) result = "12$";
            else if (age > 18 && age <= 64) result = "18$";
            else if (age > 64 && age <= 122) result = "12$";
            else result = "Error!";
        break;
        case "Weekend":
            if (age >= 0 && age <= 18) result = "15$";
            else if (age > 18 && age <= 64) result = "20$";
            else if (age > 64 && age <= 122) result = "15$";
            else result = "Error!";
        break;
        case "Holiday":
            if (age >= 0 && age <= 18) result = "5$";
            else if (age > 18 && age <= 64) result = "12$";
            else if (age > 64 && age <= 122) result = "10$";
            else result = "Error!";
        break;
    }

    console.log(`${result}`);
}

cinemaCalc("Weekday", 20);
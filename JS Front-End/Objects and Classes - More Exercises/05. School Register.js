function solve(input) {
    class Grade {
        constructor() {
            this.students = [];
            this.totalScore = 0;
        }
    
        get averageScore() {
            return Number(this.totalScore / this.students.length);
        }
    }

    let regex = /Student name: (\w+), Grade: (\d+), Graduated with an average score: (\d+(\.\d+)?)$/;

    let register = {};

    input.forEach(el => {
        let match = el.match(regex);
        let name = match[1];
        let grade = match[2];
        let averageScore = Number(match[3]);
        if (averageScore >= 3) {
            grade++;

            if (!register.hasOwnProperty(grade)) {
                let gradeClass = new Grade();
                gradeClass.students.push(name);
                gradeClass.totalScore += averageScore;
                register[grade] = gradeClass;
            } else {
                register[grade].students.push(name);
                register[grade].totalScore += averageScore;
            }
        }
    });

    for (const obj of Object.entries(register)) {
        let [grade, gradeClass] = obj;
        let averageScoreOfAllStudents = gradeClass.averageScore.toFixed(2);
        console.log(`${grade} Grade`);
        console.log(`List of students: ${gradeClass.students.join(', ')}`);
        console.log(`Average annual score from last year: ${averageScoreOfAllStudents}`);
        console.log();
    }
}

solve([
    "Student name: Mark, Grade: 8, Graduated with an average score: 4.75",
    "Student name: Ethan, Grade: 9, Graduated with an average score: 5.66",
    "Student name: George, Grade: 8, Graduated with an average score: 2.83",
    "Student name: Steven, Grade: 10, Graduated with an average score: 4.20",
    "Student name: Joey, Grade: 9, Graduated with an average score: 4.90",
    "Student name: Angus, Grade: 11, Graduated with an average score: 2.90",
    "Student name: Bob, Grade: 11, Graduated with an average score: 5.15",
    "Student name: Daryl, Grade: 8, Graduated with an average score: 5.95",
    "Student name: Bill, Grade: 9, Graduated with an average score: 6.00",
    "Student name: Philip, Grade: 10, Graduated with an average score: 5.05",
    "Student name: Peter, Grade: 11, Graduated with an average score: 4.88",
    "Student name: Gavin, Grade: 10, Graduated with an average score: 4.00"
]
);
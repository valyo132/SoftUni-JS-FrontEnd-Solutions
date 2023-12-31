function solve(input) {
    class Course {
        constructor(name, capacity) {
            this.name = name;
            this.capacity = Number(capacity);
            this.students = [];
        }

        enterStudent(newStudent) {
            if (this.capacity > 0) {
                this.students.push(newStudent);
                this.capacity--;
            }
        }
    }

    class Student {
        constructor(name, email, credits) {
            this.name = name;
            this.email = email;
            this.credits = credits;
        }
    }

    let allCourses = [];

    let regex = /(\S+)\[(\d+)\] with email (\S+) joins (.+)/;

    input.forEach(el => {
        if (el.includes(':')) {
            let [courseName, courseCapacity] = el.split(': ');
            let courseObj = allCourses.find(x => x.name == courseName);

            if (courseObj) {
                courseObj.capacity += Number(courseCapacity);
            } else {
                allCourses.push(new Course(courseName, courseCapacity));
            }
        } else if (el.includes('email')) {
            let match = el.match(regex);

            if (match) {
                let username = match[1];
                let userCredits = Number(match[2]);
                let userEmail = match[3];
                let courseName = match[4];

                let courseObj = allCourses.find(x => x.name == courseName);

                if (courseObj) {
                    courseObj.enterStudent(new Student(username, userEmail, userCredits));
                }
            }
        }
    });

    let sortedCourses = allCourses.sort((a, b) => b.students.length - a.students.length);

    for (const course of sortedCourses) {
        console.log(`${course.name}: ${course.capacity} places left`);
        let sortedStudents = course.students.sort((a, b) => b.credits - a.credits);
        for (const student of sortedStudents) {
            console.log(`--- ${student.credits}: ${student.name}, ${student.email}`);
        }
    }
}

solve(['JavaBasics: 2', 'user1[25] with email user1@user.com joins C#Basics', 'C#Advanced: 3',
    'JSCore: 4', 'user2[30] with email user2@user.com joins C#Basics', 'user13[50] with email user13@user.com joins JSCore',
    'user1[25] with email user1@user.com joins JSCore', 'user8[18] with email user8@user.com joins C#Advanced',
    'user6[85] with email user6@user.com joins JSCore', 'JSCore: 2', 'user11[3] with email user11@user.com joins JavaBasics',
    'user45[105] with email user45@user.com joins JSCore', 'user007[20] with email user007@user.com joins JSCore',
    'user700[29] with email user700@user.com joins JSCore', 'user900[88] with email user900@user.com joins JSCore']);

// Write a function that stores the students that signed up for different courses at SoftUni.
// For each course, you have to store the name, the capacity, and the students that are in it.
// For each student store the username, the email, and their credits. The input will come as an array of strings.
// The strings will be in some of the following formats:

// "{course name}: {capacity}" – add the course with that capacity. If the course exists, add the capacity to the existing one
// "{username}[{credits count}] with email {email} joins {course name}" – add the student if the course exists
//(each student can be in multiple courses) and if there are places left (count of students are less than the capacity)

// Finally, you should sort the courses by the count of students in descending.
//Each course should have its students sorted by credits in descending.

// Output
// Print the result in the format:
// "{course one}: {places left} places left
// --- {credits}: {username one}, {email one}

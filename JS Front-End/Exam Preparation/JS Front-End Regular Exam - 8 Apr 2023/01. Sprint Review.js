function sprintReview(input){
    class Assignee{
        constructor(assigneeName){
            this.assigneeName = assigneeName,
            this.tasks = []
        }
    }

    class Task{
        constructor(id, title, status, points){
            this.id = id,
            this.title = title,
            this.status = status,
            this.points = Number(points)
        }
    }

    let number = input.shift();

    let allAssigns = [];
    let totalPoints ={
        'ToDo': 0, 'In Progress': 0, 'Code Review': 0, 'Done': 0
    }

    for (let i = 0; i < number; i++) {
        let [assignee, taskId, title, status, points] = input.shift().split(':');

        let newAssignee = new Assignee(assignee);
        let newTask = new Task(taskId, title, status, points);
        totalPoints[status] += Number(points);

        if (allAssigns.some(x => x.assigneeName == newAssignee.assigneeName)){
            let existing = allAssigns.find(x => x.assigneeName == newAssignee.assigneeName)
            existing.tasks.push(newTask);
        } else{
            newAssignee.tasks.push(newTask);
            allAssigns.push(newAssignee);
        }
    }

    while (input.length > 0) {
        let [command, ...items] = input.shift().split(':');

        switch (command) {
            case 'Add New':
                addNew(items);
                break;
            case 'Change Status':
                changeStatus(items);
                break;
            case 'Remove Task':
                removeTask(items);
                break;
        }
    }

    console.log(`ToDo: ${totalPoints['ToDo']}pts`);
    console.log(`In Progress: ${totalPoints['In Progress']}pts`);
    console.log(`Code Review: ${totalPoints['Code Review']}pts`);
    console.log(`Done Points: ${totalPoints['Done']}pts`);

    let combinedPoints = totalPoints['ToDo'] + totalPoints['In Progress'] + totalPoints['Code Review'];

    if (totalPoints['Done'] >= combinedPoints){
        console.log('Sprint was successful!');
    } else{
        console.log('Sprint was unsuccessful...');
    }

    // Functions
    function removeTask(items){

        let [assignee, index] = items;
            let assigneeObj = allAssigns.find(x => x.assigneeName == assignee);

            if (index < 0 || index >= assigneeObj.tasks.length){
                console.log('Index is out of range!');
            }else{
                if(assigneeObj){
                    let deleted = assigneeObj.tasks.splice(index, 1);
                    totalPoints[deleted[0]['status']] -= deleted[0]['points'];
                } else{
                    console.log(`Assignee ${assignee} does not exist on the board!`);
                }
            }
    }

    function changeStatus(items){
        let [assignee, taskId, newStatus] = items;

        let assigneeObj = allAssigns.find(x => x.assigneeName == assignee);

        if(assigneeObj){
            let taskObj = assigneeObj.tasks.find(x => x.id == taskId);

            if(taskObj){
                totalPoints[taskObj.status] -= taskObj.points;
                totalPoints[newStatus] += taskObj.points;
                taskObj.status = newStatus;
            } else{
                console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
            }
        } else{
            console.log(`Assignee ${assignee} does not exist on the board!`);
        }
    }

    function addNew(items){
        let [assignee, taskId, title, status, points] = items;

        let assigneeObj = allAssigns.find(x => x.assigneeName == assignee);

        if(assigneeObj){
            let newTask = new Task(taskId, title, status, points);
            totalPoints[status] += Number(points);
            assigneeObj.tasks.push(newTask);
        } else{
            console.log(`Assignee ${assignee} does not exist on the board!`);
        }
    }
}

sprintReview([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
]
)
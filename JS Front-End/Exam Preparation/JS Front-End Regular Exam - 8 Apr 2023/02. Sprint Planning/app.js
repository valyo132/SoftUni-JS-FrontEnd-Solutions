window.addEventListener('load', solve);

function solve() {
    const [taskIdInput, titleINnput, pointsInput, assigneeInput, createBtn, deleteBtn] = document.querySelectorAll('input');
    const descriptionInput = document.getElementById('description');
    const selectInput = document.getElementById('label');

    const section = document.getElementById('tasks-section');
    const totalPointsEl = document.getElementById('total-sprint-points');
    let totalPoints = 0;

    // check if breaks
    let tasksCount = 0;

    let classSelector = {
        'Feature': 'feature', 'Low Priority Bug': 'low-priority', 'High Priority Bug': 'high-priority'
    }
    let HTMLIcon = {
        'Feature': '&#8865', 'Low Priority Bug': '&#9737', 'High Priority Bug': '&#9888'
    }

    createBtn.addEventListener('click', function(){
        let isValid = titleINnput.value.length > 0 && pointsInput.value.length > 0 && assigneeInput.value.length > 0 && descriptionInput.value.length > 0;

        if (isValid){
            const article = createCustomElement('article', 'none', 'task-card');
            article.id = `task-${++tasksCount}`;

            const div = createCustomElement('div', selectInput.value, 'task-card-label');
            div.classList.add(classSelector[selectInput.value]);
            div.innerHTML += ' ' + HTMLIcon[selectInput.value];
            article.appendChild(div);

            article.appendChild(createCustomElement('h3', titleINnput.value, 'task-card-title'));
            article.appendChild(createCustomElement('p', descriptionInput.value, 'task-card-description'));
            article.appendChild(createCustomElement('div', `Estimated at ${pointsInput.value} pts`, 'task-card-points'));
            totalPoints += Number(pointsInput.value);
            totalPointsEl.innerHTML = `Total Points ${totalPoints}pts`;
            article.appendChild(createCustomElement('div', `Assigned to: ${assigneeInput.value}`, 'task-card-assignee'));

            const actions = createCustomElement('div', 'none', 'task-card-actions');
            const deleteTaskBtn = createCustomElement('button', 'Delete', 'none');
            deleteTaskBtn.addEventListener('click', function(){
                taskIdInput.value = article.id;
                descriptionInput.value = article.getElementsByClassName('task-card-description')[0].textContent;
                titleINnput.value = article.getElementsByClassName('task-card-title')[0].textContent;
                selectInput.value = article.getElementsByClassName('task-card-label')[0].textContent;
                pointsInput.value = article.getElementsByClassName('task-card-points')[0].textContent.split(' ')[2];
                assigneeInput.value = article.getElementsByClassName('task-card-assignee')[0].textContent.split(': ')[1];
                descriptionInput.disabled = true;
                titleINnput.disabled = true;
                selectInput.disabled = true;
                pointsInput.disabled = true;
                assigneeInput.disabled = true;
                createBtn.disabled = true;
                deleteBtn.disabled = false;

                deleteBtn.addEventListener('click', function(){
                    article.remove();

                    totalPoints -= Number(pointsInput.value);
                    totalPointsEl.innerHTML = `Total Points ${totalPoints}pts`;

                    descriptionInput.disabled = false;
                    titleINnput.disabled = false;
                    selectInput.disabled = false;
                    pointsInput.disabled = false;
                    assigneeInput.disabled = false;
                    createBtn.disabled = false;
                    deleteBtn.disabled = true;

                    taskIdInput.value = '';
                    titleINnput.value = '';
                    pointsInput.value = '';
                    assigneeInput.value = '';
                    descriptionInput.value = '';
                });
            });
            actions.appendChild(deleteTaskBtn);

            article.appendChild(actions);
            section.appendChild(article);

            titleINnput.value = '';
            pointsInput.value = '';
            assigneeInput.value = '';
            descriptionInput.value = '';
        }
    });

    function createCustomElement(type, content, classOf){
        let item = document.createElement(type);

        if (content != 'none'){
            item.textContent = content;
        }

        if (classOf != 'none'){
            item.classList.add(classOf);
        }

        return item;
    }
}
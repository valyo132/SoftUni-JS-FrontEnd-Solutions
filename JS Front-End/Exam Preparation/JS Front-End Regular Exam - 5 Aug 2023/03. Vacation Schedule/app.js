function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/tasks/';

    const [addBtnForm, editBtnForm, loadBtnForm] = document.querySelectorAll('button');
    const [nameInput, daysInput, dateInput] = document.querySelectorAll('input');

    const tasksList = document.getElementById('list');

    loadBtnForm.addEventListener('click', loadTasks);
    addBtnForm.addEventListener('click', addTask);

    function loadTasks(event){
        tasksList.innerHTML = '';

        event?.preventDefault();

        fetch(baseUrl)
            .then((data) => data.json())
            .then((response) => {
                for (const [taskId, taskObj] of Object.entries(response)) {
                    const div = createCustomElement('div', 'none', 'container');
                    div.id = taskObj._id;

                    div.appendChild(createCustomElement('h2', taskObj.name, 'none'));
                    div.appendChild(createCustomElement('h3', taskObj.date, 'none'));
                    div.appendChild(createCustomElement('h3', taskObj.days, 'none'));

                    const changeBtn = createCustomElement('button', 'Change', 'change-btn');
                    changeBtn.addEventListener('click', loadChangeTask);
                    div.appendChild(changeBtn);

                    const doneBtn = createCustomElement('button', 'Done', 'done-btn');
                    doneBtn.addEventListener('click', removeTask);
                    div.appendChild(doneBtn);

                    tasksList.appendChild(div);
                }
            });
    }

    function removeTask(event){
        event?.preventDefault();
        let id = event.currentTarget.parentNode.id;

        fetch(`${baseUrl}${id}`, {
            method: 'DELETE'
        }).then(() => loadTasks());
    }

    let changeId = '';

    function loadChangeTask(event){
        event?.preventDefault();

        let parent = event.currentTarget.parentNode;
        changeId = parent.id;
        parent.remove();

        nameInput.value = parent.querySelector('h2').textContent;
        daysInput.value = parent.querySelectorAll('h3')[1].textContent;
        dateInput.value = parent.querySelectorAll('h3')[0].textContent;

        editBtnForm.disabled = false;
        addBtnForm.disabled = true;

        editBtnForm.addEventListener('click', executeEditTask);
    }

    function executeEditTask(event){
        event?.preventDefault();

        let isValid = nameInput.value.length > 0 && daysInput.value.length > 0 && dateInput.value.length > 0;
        if (isValid){
            fetch(`${baseUrl}${changeId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: nameInput.value,
                    days: daysInput.value.toString(),
                    date: dateInput.value.toString()
                })
            }).then(() => {
                nameInput.value = '';
                dateInput.value = '';
                daysInput.value = '';

                editBtnForm.disabled = true;
                addBtnForm.disabled = false;
                loadTasks();
            })
        }
    }

    function addTask(event){
        event?.preventDefault();

        let isValid = nameInput.value.length > 0 && daysInput.value.length > 0 && dateInput.value.length > 0;

        if (isValid){
            fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify({
                    name: nameInput.value,
                    days: daysInput.value.toString(),
                    date: dateInput.value.toString()
                })
            }).then(() => {
                nameInput.value = '';
                dateInput.value = '';
                daysInput.value = '';
                loadTasks();
            })
        }
    }

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

attachEvents();
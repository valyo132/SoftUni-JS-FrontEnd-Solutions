function attachItems(){
    const baseUrl = 'http://localhost:3030/jsonstore/tasks/';

    const [titleInput, typeInput, teacherInput] = document.querySelectorAll('input');
    const descriptionInput = document.getElementById('description');

    const [addBtnForm, editBtnForm, loadBtn] = document.querySelectorAll('button');

    const tasksList = document.getElementById('list');
    
    addBtnForm.addEventListener('click', addTask);
    loadBtn.addEventListener('click', loadTasks);

    function loadTasks(event){
        event?.preventDefault();

        fetch(baseUrl)
            .then((data) => data.json())
            .then((tasks) => {
                tasksList.innerHTML = '';

                for (const [taskId, taskObj] of Object.entries(tasks)) {
                    const div = createCustomElement('div', 'none', 'container');
                    div.id = taskObj._id;

                    div.appendChild(createCustomElement('h2', taskObj.title, 'none'));
                    div.appendChild(createCustomElement('h3', taskObj.teacher, 'none'));
                    div.appendChild(createCustomElement('h3', taskObj.type, 'none'));
                    div.appendChild(createCustomElement('h4', taskObj.description, 'none'));

                    const editTaskBtn = createCustomElement('button', 'Edit Course', 'edit-btn');
                    editTaskBtn.addEventListener('click', loadEditTask);
                    div.appendChild(editTaskBtn);

                    const finishTaskBtn = createCustomElement('button', 'Finish Course', 'finish-btn');
                    finishTaskBtn.addEventListener('click', finishTask);
                    div.appendChild(finishTaskBtn);

                    tasksList.appendChild(div);
                }
            })
    }

    function finishTask(event){
        event?.preventDefault();

        const id = event.currentTarget.parentNode.id;

        fetch(`${baseUrl}${id}`, {
            method: 'DELETE'
        }).then(() => loadTasks());
    }

    let idToEdit = '';

    function loadEditTask(event){
        event?.preventDefault();

        const div = event.currentTarget.parentNode;
        console.log(div);
        idToEdit = div.id;
        div.remove();

        titleInput.value = div.querySelector('div h2').textContent;
        teacherInput.value = div.querySelectorAll('div h3')[0].textContent;
        typeInput.value = div.querySelectorAll('div h3')[1].textContent;
        descriptionInput.value = div.querySelector('div h4').textContent;

        editBtnForm.disabled = false;
        addBtnForm.disabled = true;

        editBtnForm.addEventListener('click', executeEditTask);
    }

    function executeEditTask(event){
        event?.preventDefault();

        let isValid = titleInput.value.length > 0 && descriptionInput.value.length > 0 && teacherInput.value.length > 0;
        let isTypeValid = typeInput.value == 'Long' || typeInput.value == 'Medium' || typeInput.value == 'Short';

        if (isTypeValid && isValid){
            fetch(`${baseUrl}${idToEdit}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: titleInput.value,
                    type: typeInput.value,
                    description: descriptionInput.value,
                    teacher: teacherInput.value
                })
            }).then(() => {
                titleInput.value = '';
                typeInput.value = '';
                descriptionInput.value = '';
                teacherInput.value = '';

                editBtnForm.disabled = true;
                addBtnForm.disabled = false;

                loadTasks();
            })
        }
    }

    function addTask(event){
        event?.preventDefault();

        let isValid = titleInput.value.length > 0 && descriptionInput.value.length > 0 && teacherInput.value.length > 0;
        let isTypeValid = typeInput.value == 'Long' || typeInput.value == 'Medium' || typeInput.value == 'Short';

        if (isTypeValid && isValid){
            fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify({
                    title: titleInput.value,
                    type: typeInput.value,
                    description: descriptionInput.value,
                    teacher: teacherInput.value
                })
            }).then(() => {
                titleInput.value = '';
                typeInput.value = '';
                descriptionInput.value = '';
                teacherInput.value = '';

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

attachItems();
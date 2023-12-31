function attachEvents(){
    const baseUrl = 'http://localhost:3030/jsonstore/tasks/';

    const [locationInput, tempInput, dateInput] = document.querySelectorAll('input');
    const [addBtnForm, editBtnForm, loadBtnForm] = document.querySelectorAll('button');

    const taskList = document.getElementById('list');

    loadBtnForm.addEventListener('click', loadTasks);
    addBtnForm.addEventListener('click', addWhether);

    function loadTasks(event){
        event?.preventDefault();

        fetch(baseUrl)
            .then((data) => data.json())
            .then((tasks) => {
                taskList.innerHTML = '';

                for (const [taskId, taskObj] of Object.entries(tasks)) {
                    const div = createCustomElement('div', 'none', 'container');
                    div.id = taskObj._id;

                    div.appendChild(createCustomElement('h2', taskObj.location, 'none'));
                    div.appendChild(createCustomElement('h3', taskObj.date, 'none'));
                    div.appendChild(createCustomElement('h3', taskObj.temperature, 'celsius'));

                    const buttonsSection = createCustomElement('div', 'none', 'buttons-container');

                    const changeBtn = createCustomElement('button', 'Change', 'change-btn');
                    changeBtn.addEventListener('click', loadEditWhether);
                    buttonsSection.appendChild(changeBtn);

                    const deleteBtn = createCustomElement('button', 'Delete', 'delete-btn');
                    deleteBtn.addEventListener('click', deleteWhether);
                    buttonsSection.appendChild(deleteBtn);

                    div.appendChild(buttonsSection);
                    taskList.appendChild(div);
                }
            })
    }

    function deleteWhether(event){
        event?.preventDefault();
        const id = event.currentTarget.parentNode.parentNode.id;
        console.log(id);

        fetch(`${baseUrl}${id}`, {
            method: 'DELETE'
        }).then(() => loadTasks());
    }

    let idToEdit = '';

    function loadEditWhether(event){
        event?.preventDefault();

        const div = event.currentTarget.parentNode.parentNode;
        idToEdit = div.id;
        div.remove();

        locationInput.value = div.querySelector('h2').textContent;
        tempInput.value = div.querySelectorAll('h3')[1].textContent;
        dateInput.value = div.querySelectorAll('h3')[0].textContent;

        addBtnForm.disabled = true;
        editBtnForm.disabled = false;

        editBtnForm.addEventListener('click', executeEditWhether);
    }

    function executeEditWhether(event){
        event?.preventDefault();

        let isValid = locationInput.value.length > 0 && tempInput.value.length > 0 && dateInput.value.length > 0;

        if (isValid){
            fetch(`${baseUrl}${idToEdit}`, {
                method: 'PUT',
                body: JSON.stringify({
                    location: locationInput.value,
                    temperature: tempInput.value,
                    date: dateInput.value
                })
            }).then(() => {
                locationInput.value = '';
                tempInput.value = '';
                dateInput.value = '';
                addBtnForm.disabled = false;
                editBtnForm.disabled = true;

                loadTasks();
            })
        }
    }

    function addWhether(event){
        event?.preventDefault();

        let isValid = locationInput.value.length > 0 && tempInput.value.length > 0 && dateInput.value.length > 0;

        if (isValid){
            fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify({
                    location: locationInput.value,
                    temperature: tempInput.value,
                    date: dateInput.value
                })
            }).then(() => {
                locationInput.value = '';
                tempInput.value = '';
                dateInput.value = '';
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
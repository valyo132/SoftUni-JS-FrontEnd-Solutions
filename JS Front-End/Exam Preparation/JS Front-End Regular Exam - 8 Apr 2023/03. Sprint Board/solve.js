// TODO:
function attachEvents() {
  const baseUrl = "http://localhost:3030/jsonstore/tasks/";

  const toDoSection = document.querySelector('#todo-section .task-list');
  const inProgressSection = document.querySelector('#in-progress-section .task-list');
  const codeReviewSection = document.querySelector('#code-review-section .task-list');
  const doneSection = document.querySelector('#done-section .task-list');

  const [loadBtnForm, titleInput, createTaskBtn] = document.querySelectorAll('input');
  const descriptionInput = document.getElementById('description');

  let buttonText = {
    'ToDo': 'Move to In Progress', 'In Progress': 'Move to Code Review', 'Code Review': 'Move to Done', 'Done': 'Close'
  }

  let sectionDecider = {
    'ToDo': toDoSection, 'In Progress': inProgressSection, 'Code Review': codeReviewSection, 'Done': doneSection
  }

  let actionDecider = {
    'ToDo': moveToProgress, 'In Progress': moveToCodeReview, 'Code Review': moveToDone, 'Done': closeTask
  }

  loadBtnForm.addEventListener('click', loadTasks);
  createTaskBtn.addEventListener('click', addTask);

  function addTask(event){
    event?.preventDefault();
    
    let isValid = titleInput.value.length > 0 && descriptionInput.value.length > 0;

    if (isValid){
        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify({
                title: titleInput.value,
                description: descriptionInput.value,
                status: 'ToDo'
            })
        }).then(() => {
            titleInput.value = '';
            descriptionInput.value = '';
            loadTasks();
        }).catch((err) => console.log(err));
    }
  }
  
  function loadTasks(event){
    event?.preventDefault();

    toDoSection.innerHTML = '';
    inProgressSection.innerHTML = '';
    codeReviewSection.innerHTML = '';
    doneSection.innerHTML = '';

    fetch(baseUrl)
        .then((data) => data.json())
        .then((response) => {
            for (const [taskId, taskObj] of Object.entries(response)) {
                let section = sectionDecider[taskObj.status];

                const li = createCustomElement('li', 'none', 'task');
                li.id = taskObj._id;

                li.appendChild(createCustomElement('h3', taskObj.title, 'none'));
                li.appendChild(createCustomElement('p', taskObj.description, 'none'));
                const nextActionBtn = createCustomElement('button', buttonText[taskObj.status], 'none');
                nextActionBtn.addEventListener('click', actionDecider[taskObj.status]);
                li.appendChild(nextActionBtn);

                section.appendChild(li);
            }
        }).catch((err) => console.log(err));;
  }

  function moveToProgress(event){
    event?.preventDefault();

    let id = event.currentTarget.parentNode.id;

    fetch(`${baseUrl}${id}`, {
        method: 'PATCH',
        body: JSON.stringify({status: 'In Progress'})
    }).then(() => loadTasks());
  }

  function moveToCodeReview (event){
    event?.preventDefault();

    let id = event.currentTarget.parentNode.id;

    fetch(`${baseUrl}${id}`, {
        method: 'PATCH',
        body: JSON.stringify({status: 'Code Review'})
    }).then(() => loadTasks());
  }

  function moveToDone(event){
    event?.preventDefault();

    let id = event.currentTarget.parentNode.id;

    fetch(`${baseUrl}${id}`, {
        method: 'PATCH',
        body: JSON.stringify({status: 'Done'})
    }).then(() => loadTasks());
  }

  function closeTask(event){
    event?.preventDefault();

    let id = event.currentTarget.parentNode.id;

    fetch(`${baseUrl}${id}`, {
        method: 'DELETE'
    }).then(() => loadTasks());
  }
  
  function createCustomElement(type, content, classOf) {
    let item = document.createElement(type);

    if (content != "none") {
      item.textContent = content;
    }

    if (classOf != "none") {
      item.classList.add(classOf);
    }

    return item;
  }
}

attachEvents();

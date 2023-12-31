// TODO
function attachEvents() {
  const baseUrl = 'http://localhost:3030/jsonstore/tasks/';

  const btnLoad = document.getElementById('load-button');
  const btnAdd = document.getElementById('add-button');

  const titleInput = document.getElementById('title');

  const todoList = document.getElementById('todo-list');

  btnLoad.addEventListener('click', load);
  btnAdd.addEventListener('click', addTask);

  function addTask(event){
    if (event){
        event.preventDefault();
    }
    
    let name = titleInput.value;

    fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({name})
    }).then(() => {
        titleInput.value = '';
        load();
    });
  }

  function load(event){
    if (event){
        event.preventDefault();
    }
    
    todoList.innerHTML = '';

    fetch(baseUrl)
        .then((data) => data.json())
        .then((tasks) => {
            for (const [listKey, listObj] of Object.entries(tasks)) {
                let li = document.createElement('li');
                li.id = listObj._id;
        
                let span = document.createElement('span');
                span.textContent = `${listObj.name}`;
                li.appendChild(span);
        
                let removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                li.appendChild(removeBtn);
        
                let editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                li.appendChild(editBtn);
        
                todoList.appendChild(li);

                editBtn.addEventListener('click', loadEditFrom);
                removeBtn.addEventListener('click', remove);
            }
        });
  }

  function remove(event){
    const id = event.currentTarget.parentNode.id;

    fetch(`${baseUrl}${id}`, {
        method: 'DELETE',
    }).then(() => load());
  }

  function loadEditFrom(event){
    const liParent = event.currentTarget.parentNode;
    let [ span, _deleteButton, editButton ] = Array.from(liParent.children);

    const editBtn = document.createElement('input');
    editBtn.value = span.textContent;
    liParent.prepend(editBtn);

    const submitBtn = document.createElement('button');
    submitBtn.addEventListener('click', submitEdit);
    submitBtn.textContent = 'Submit';
    liParent.appendChild(submitBtn);
    
    span.remove();
    editButton.remove();
  }

  function submitEdit(event){
    const liParent = event.currentTarget.parentNode;
    const id = event.currentTarget.parentNode.id;
    const [input] = Array.from(liParent.children);
    fetch(`${baseUrl}${id}`, {
        method: 'PATCH',
        body: JSON.stringify({name: input.value})
    }).then(() => load());
  }
}

attachEvents();

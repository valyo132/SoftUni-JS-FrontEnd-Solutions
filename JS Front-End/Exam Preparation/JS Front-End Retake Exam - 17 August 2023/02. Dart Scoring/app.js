window.addEventListener("load", solve);

function solve() {

  const [nameInput, scoreInput, roundInput] = document.querySelectorAll('input');
  const [addBtn, clerBtn] = document.querySelectorAll('button');

  const sureList = document.getElementById('sure-list');
  const scoreboard = document.getElementById('scoreboard-list');

  clerBtn.addEventListener('click', function(){
    location.reload();
  });

  addBtn.addEventListener('click', function(){
    
    let isValid = nameInput.value.length > 0 && scoreInput.value.length > 0 && roundInput.value.length > 0;

    if (isValid){
      const li = createCustomElement('li', 'none', 'dart-item');

      const article = createCustomElement('article', 'none', 'none');
      article.appendChild(createCustomElement('p', nameInput.value, 'none'));
      article.appendChild(createCustomElement('p', `Score: ${scoreInput.value}`, 'none'));
      article.appendChild(createCustomElement('p', `Round: ${roundInput.value}`, 'none'));
      li.appendChild(article);

      const editBtn = createCustomElement('button', 'edit', 'btn');
      editBtn.classList.add('edit');
      editBtn.addEventListener('click', editTask);
      li.appendChild(editBtn);

      const okBtn = createCustomElement('button', 'ok', 'btn');
      okBtn.classList.add('ok');
      okBtn.addEventListener('click', okTask);
      li.appendChild(okBtn);

      sureList.appendChild(li);

      addBtn.disabled = true;
      nameInput.value = '';
      scoreInput.value = '';
      roundInput.value = '';
    }
  });

  function okTask(event){
    const li = event.currentTarget.parentNode;
    li.remove();

    const [btn1, btn2] = li.querySelectorAll('button');
    btn1.remove();
    btn2.remove();

    scoreboard.appendChild(li);
    addBtn.disabled = false;
  }

  function editTask(event){
    const li = event.currentTarget.parentNode;
    li.remove();

    nameInput.value = li.querySelectorAll('article p')[0].textContent;
    scoreInput.value = li.querySelectorAll('article p')[1].textContent.split('Score: ')[1];
    roundInput.value =  li.querySelectorAll('article p')[2].textContent.split('Round: ')[1];

    addBtn.disabled = false;
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

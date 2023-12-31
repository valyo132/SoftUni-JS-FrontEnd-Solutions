window.addEventListener("load", solve);

function solve() {

  const [nameInput, uniInput, scoreInput] = document.querySelectorAll('input');
  const nextBtn = document.getElementById('next-btn');

  const previewList = document.getElementById('preview-list');
  const candidatsList = document.getElementById('candidates-list');

  nextBtn.addEventListener('click', function(){
    let isValid = nameInput.value.length > 0 && uniInput.value.length > 0 && scoreInput.value.length > 0;

    if (isValid){
      const li = createCustomElement('li', 'none', 'application');

      const article = createCustomElement('article', 'none', 'none');
      article.appendChild(createCustomElement('h4', nameInput.value, 'none'));
      article.appendChild(createCustomElement('p', `University: ${uniInput.value}`, 'none'));
      article.appendChild(createCustomElement('p', `Score: ${scoreInput.value}`, 'none'));
      li.appendChild(article);

      const editBtn = createCustomElement('button', 'edit', 'action-btn');
      editBtn.classList.add('edit');
      editBtn.addEventListener('click', editItem);

      const applyBtn = createCustomElement('button', 'apply', 'action-btn');
      applyBtn.classList.add('apply');
      applyBtn.addEventListener('click', applyItem);

      li.appendChild(editBtn);
      li.appendChild(applyBtn);

      previewList.appendChild(li);

      nextBtn.disabled = true;
      nameInput.value = '';
      uniInput.value = '';
      scoreInput.value = '';
    }
  });

  function applyItem(event){
    let parent = event.currentTarget.parentNode;

    let [editBtnForm, applyBtnForm] = parent.querySelectorAll('button');
    editBtnForm.remove();
    applyBtnForm.remove();

    parent.remove();
    candidatsList.appendChild(parent);
    nextBtn.disabled = false;
  }

  function editItem(event){
    let parent = event.currentTarget.parentNode;

    nameInput.value = parent.querySelector('article h4').textContent;
    uniInput.value = parent.querySelectorAll('article p')[0].textContent.split(' ')[1];
    scoreInput.value = parent.querySelectorAll('article p')[1].textContent.split(' ')[1];

    parent.remove();
    nextBtn.disabled = false;
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
  
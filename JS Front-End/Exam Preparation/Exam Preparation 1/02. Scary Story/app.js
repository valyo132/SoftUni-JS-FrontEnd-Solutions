window.addEventListener("load", solve);

function solve() {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const ageInput = document.getElementById('age');
  const storyTitle = document.getElementById('story-title');
  const select = document.getElementById('genre');
  const storyInput = document.getElementById('story');

  const previewList = document.getElementById('preview-list');

  const publishBtn = document.getElementById('form-btn');

  publishBtn.addEventListener('click', function(){
      let isValid = firstNameInput.value != '' && lastNameInput.value != '' && ageInput.value != ''
        && storyTitle.value != '' && storyInput.value != '';

      if (isValid){
          let li = document.createElement('li');
          li.classList.add('story-info');

          let article = document.createElement('article');

          let h4 = document.createElement('h4');
          h4.textContent = `Name: ${firstNameInput.value} ${lastNameInput.value}`;
          article.appendChild(h4);
          let ageP = document.createElement('p');
          ageP.textContent = `Age: ${age.value}`;
          article.appendChild(ageP);
          let titleP = document.createElement('p');
          titleP.textContent = `Title: ${storyTitle.value}`;
          article.appendChild(titleP);
          let genreP = document.createElement('p');
          genreP.textContent = `Genre: ${select.value}`;
          article.appendChild(genreP);
          let storyP = document.createElement('p');
          storyP.textContent = storyInput.value;
          article.appendChild(storyP);

          li.appendChild(article);

          let saveBtn = document.createElement('button');
          saveBtn.textContent = 'Save Story';
          saveBtn.classList.add('save-btn');
          li.appendChild(saveBtn);

          let editBtn = document.createElement('button');
          editBtn.textContent = 'Edit Story';
          editBtn.classList.add('edit-btn');
          li.appendChild(editBtn);

          let deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete Story';
          deleteBtn.classList.add('delete-btn');
          li.appendChild(deleteBtn);

          previewList.appendChild(li);

          firstNameInput.value = '';
          lastNameInput.value = '';
          ageInput.value = '';
          storyTitle.value = '';
          storyInput.value = '';
          publishBtn.disabled = true;

          editBtn.addEventListener('click', function(){
            firstNameInput.value = h4.textContent.split(' ')[1];
            lastNameInput.value = h4.textContent.split(' ')[2];
            ageInput.value = ageP.textContent.split(' ')[1];
            storyTitle.value = titleP.textContent.split(' ')[1];
            select.value = genreP.textContent.split(' ')[1];
            storyInput.value = storyP.textContent;

            li.remove();
            publishBtn.disabled = false;
          });

          saveBtn.addEventListener('click', function(){
            let h1 = document.createElement('h1');
            h1.textContent = "Your scary story is saved!";

            const main = document.getElementById('main');
            main.innerHTML = '';
            main.appendChild(h1);
          });

          deleteBtn.addEventListener('click', function(){
            li.remove();
            publishBtn.disabled = false;
          });
      }
  });
}

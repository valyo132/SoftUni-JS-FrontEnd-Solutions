window.addEventListener("load", solve);

function solve() {

    const [titleInput, categoryInput] = document.querySelectorAll('input');
    const contentInput = document.getElementById('task-content');
    const publishBtn = document.getElementById('publish-btn');

    const previewList = document.getElementById('review-list');
    const publishedList = document.getElementById('published-list');

    publishBtn.addEventListener('click', function(){
        let isValid = titleInput.value.length > 0 && categoryInput.value.length > 0 && contentInput.value.length > 0;

        if(isValid){
            const li = createCustomElement('li', 'none', 'rpost');

            const article = createCustomElement('article', 'none', 'none');
            article.appendChild(createCustomElement('h4', titleInput.value, 'none'));
            article.appendChild(createCustomElement('p', `Category: ${categoryInput.value}`, 'none'));
            article.appendChild(createCustomElement('p', `Content: ${contentInput.value}`, 'none'));
            li.appendChild(article);

            const editBtn = createCustomElement('button', 'Edit', 'action-btn');
            editBtn.classList.add('edit');
            li.appendChild(editBtn);
            editBtn.addEventListener('click', editTask);

            const postBtn = createCustomElement('button', 'Post', 'action-btn');
            postBtn.classList.add('post');
            li.appendChild(postBtn);
            postBtn.addEventListener('click', postTask);

            previewList.appendChild(li);

            titleInput.value = '';
            categoryInput.value = '';
            contentInput.value = '';
        }
    });

    function postTask(event){
        let li = event.currentTarget.parentNode;
        li.remove();

        const [btn1, btn2] = li.querySelectorAll('button');
        btn1.remove();
        btn2.remove();

        publishedList.appendChild(li);
    }

    function editTask(event){
        let li = event.currentTarget.parentNode;
        li.remove();

        titleInput.value = li.querySelector('article h4').textContent;
        categoryInput.value = li.querySelectorAll('article p')[0].textContent.split('Category: ')[1];
        contentInput.value = li.querySelectorAll('article p')[1].textContent.split('Content: ')[1];
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
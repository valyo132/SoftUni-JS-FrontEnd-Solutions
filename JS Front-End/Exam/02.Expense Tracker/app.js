window.addEventListener("load", solve);

function solve(){
    const [expenseInput, amountInput, dateInput] = document.querySelectorAll('input');
    const [addBtn, deleteBtn] = document.querySelectorAll('button');

    const previewList = document.getElementById('preview-list');
    const expenseList = document.getElementById('expenses-list');

    deleteBtn.addEventListener('click', function(event){
        location.reload();
    });

    addBtn.addEventListener('click', function(){
        let isValid = expenseInput.value.length > 0 && amountInput.value.length > 0 && dateInput.value.length > 0;

        if (isValid){
            const li = createCustomElement('li', 'none', 'expense-item');

            const article = createCustomElement('article', 'none', 'none');
            article.appendChild(createCustomElement('p', `Type: ${expenseInput.value}`, 'none'));
            article.appendChild(createCustomElement('p', `Amount: ${amountInput.value}$`, 'none'));
            article.appendChild(createCustomElement('p', `Date: ${dateInput.value}`, 'none'));
            li.appendChild(article);

            const buttonsSection = createCustomElement('div', 'none', 'buttons');

            const editBtn = createCustomElement('button', 'edit', 'btn');
            editBtn.classList.add('edit');
            editBtn.addEventListener('click', editTask);
            buttonsSection.appendChild(editBtn);

            const okBtn = createCustomElement('button', 'ok', 'btn');
            okBtn.classList.add('ok');
            okBtn.addEventListener('click', moveToExpense);
            buttonsSection.appendChild(okBtn);

            li.appendChild(buttonsSection);
            previewList.appendChild(li);

            expenseInput.value = '';
            amountInput.value = '';
            dateInput.value = '';

            addBtn.disabled = true;
        }
    });

    function moveToExpense(event){
        const div = event.currentTarget.parentNode.parentNode;
        div.remove();

        const btnSection = div.querySelector('.buttons');
        btnSection.remove();

        expenseList.appendChild(div);
        addBtn.disabled = false;
    }

    function editTask(event){
        const div = event.currentTarget.parentNode.parentNode;
        div.remove();

        expenseInput.value = div.querySelectorAll(".expense-item>article>p")[0].textContent.split('Type: ')[1];
        amountInput.value = div.querySelectorAll(".expense-item>article>p")[1].textContent.split('Amount: ')[1].split('$')[0];
        dateInput.value = div.querySelectorAll(".expense-item>article>p")[2].textContent.split('Date: ')[1];

        addBtn.disabled = false;
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
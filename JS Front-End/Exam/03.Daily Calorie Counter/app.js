function attachEvents(){
    const baeUrl = 'http://localhost:3030/jsonstore/tasks/';

    const [foodInput, timeInput, caloriesInput] = document.querySelectorAll('input');
    const [addBtnForm, editBtnForm, loadBtnForm] = document.querySelectorAll('button');

    const productsList = document.getElementById('list');

    addBtnForm.addEventListener('click', addProduct);
    loadBtnForm.addEventListener('click', loadProducts);

    function loadProducts(event){
        event?.preventDefault();

        fetch(baeUrl)
            .then((data) => data.json())
            .then((allProducts) => {
                productsList.innerHTML = '';

                for (const [productId, productObj] of Object.entries(allProducts)) {
                    const div = createCustomElement('div', 'none', 'meal');
                    div.id = productObj._id;

                    div.appendChild(createCustomElement('h2', productObj.food, 'none'));
                    div.appendChild(createCustomElement('h3', productObj.time, 'none'));
                    div.appendChild(createCustomElement('h3', productObj.calories, 'none'));

                    const mealButtons = createCustomElement('div', 'none', 'meal-buttons');

                    const changeBtn = createCustomElement('button', 'Change', 'change-meal');
                    changeBtn.addEventListener('click', loadEditProduct);
                    mealButtons.appendChild(changeBtn);

                    const deleteBtn = createCustomElement('button', 'Delete', 'delete-meal');
                    deleteBtn.addEventListener('click', deleteProduct);
                    mealButtons.appendChild(deleteBtn);

                    div.appendChild(mealButtons);
                    productsList.appendChild(div);
                }
            })
    }

    function deleteProduct(event){
        event?.preventDefault();

        const id = event.currentTarget.parentNode.parentNode.id;
        console.log(id);

        fetch(`${baeUrl}${id}`,{
            method: 'DELETE'
        }).then(() => loadProducts());
    }

    let idToEdit = '';

    function loadEditProduct(event){
        event?.preventDefault();

        const div = event.currentTarget.parentNode.parentNode;
        idToEdit = div.id;

        div.remove();

        foodInput.value = div.querySelector('h2').textContent;
        timeInput.value = div.querySelectorAll('h3')[0].textContent;
        caloriesInput.value = div.querySelectorAll('h3')[1].textContent;

        addBtnForm.disabled = true;
        editBtnForm.disabled = false;

        editBtnForm.addEventListener('click', executeEditProduct);
    }

    function executeEditProduct(event){
        event?.preventDefault();

        let isValid = foodInput.value.length > 0 && timeInput.value.length > 0 && caloriesInput.value.length > 0;

        if (isValid){
            fetch(`${baeUrl}${idToEdit}`, {
                method: 'PUT',
                body: JSON.stringify({
                    food: foodInput.value,
                    calories: caloriesInput.value,
                    time: timeInput.value
                })
            }).then(() => {
                foodInput.value = '';
                timeInput.value = '';
                caloriesInput.value = '';

                addBtnForm.disabled = false;
                editBtnForm.disabled = true;
        
                loadProducts();
            })
        }
    }

    function addProduct(event){
        event?.preventDefault();

        let isValid = foodInput.value.length > 0 && timeInput.value.length > 0 && caloriesInput.value.length > 0;

        if (isValid){
            fetch(baeUrl, {
                method: 'POST',
                body: JSON.stringify({
                    food: foodInput.value,
                    calories: caloriesInput.value,
                    time: timeInput.value
                })
            }).then(() => {
                foodInput.value = '';
                timeInput.value = '';
                caloriesInput.value = '';

                loadProducts();
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
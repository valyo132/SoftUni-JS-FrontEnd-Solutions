    function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/grocery/";

    const [addBtn, updateBtnForm, loadBtn] =
        document.querySelectorAll(".list button");
    const [productInput, countInput, priceInput] =
        document.querySelectorAll("input");

    const tbody = document.getElementById("tbody");

    loadBtn.addEventListener("click", loadList);
    addBtn.addEventListener("click", addItem);

    function addItem(event) {
        event?.preventDefault();

        if (
        productInput.value.length !== 0 &&
        countInput.value.length !== 0 &&
        priceInput.value.length !== 0
        ) {
        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify({
            product: productInput.value,
            count: countInput.value,
            price: priceInput.value,
            }),
        }).then(() => {
            productInput.value = "";
            priceInput.value = "";
            countInput.value = "";
            loadList();
        });
        }
    }

    function loadList(event) {
        event?.preventDefault();

        tbody.innerHTML = "";

        fetch(baseUrl)
        .then((data) => data.json())
        .then((items) => {
            for (const [itemId, itemObj] of Object.entries(items)) {
            const tr = document.createElement("tr");
            tr.id = itemObj._id;

            tr.appendChild(craeteCustonElement("td", itemObj.product, "name"));
            tr.appendChild(
                craeteCustonElement("td", itemObj.count, "count-product")
            );
            tr.appendChild(
                craeteCustonElement("td", itemObj.price, "product-price")
            );

            const buttonsSection = craeteCustonElement("td", "none", "btn");

            const updateBtn = craeteCustonElement("button", "Update", "update");
            buttonsSection.appendChild(updateBtn);
            updateBtn.addEventListener("click", loadUpdeteItem);
            const deleteBtn = craeteCustonElement("button", "Delete", "delete");
            deleteBtn.addEventListener("click", deleteItem);
            buttonsSection.appendChild(deleteBtn);

            tr.appendChild(buttonsSection);
            tbody.appendChild(tr);
            }
        });
    }

    function loadUpdeteItem(event) {
        event?.preventDefault();

        updateBtnForm.disabled = false;
        addBtn.disabled = true;

        let itemTr = event.currentTarget.parentNode.parentNode;

        productInput.value = itemTr.querySelectorAll(".name")[0].textContent;
        countInput.value = itemTr.querySelectorAll(".count-product")[0].textContent;
        priceInput.value = itemTr.querySelectorAll(".product-price")[0].textContent;

        updateBtnForm.addEventListener("click", executeUpdateItem);
        updateBtnForm.id = itemTr.id;
    }

    function executeUpdateItem(event) {
        event?.preventDefault();

        let id = event.currentTarget.id;
        
        if ( productInput.value.length !== 0 && countInput.value.length !== 0 && priceInput.value.length !== 0) {
            fetch(`${baseUrl}${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                product: productInput.value,
                count: countInput.value,
                price: priceInput.value,
                }),
            }).then(() => {
                productInput.value = "";
                priceInput.value = "";
                countInput.value = "";
                updateBtnForm.disabled = true;
                addBtn.disabled = false;
                loadList();
            }).catch((err) => console.log(err));
        }
    }

    function deleteItem(event) {
        event?.preventDefault();

        let id = event.currentTarget.parentNode.parentNode.id;
        fetch(`${baseUrl}${id}`, {
        method: "DELETE",
        }).then(() => loadList())
        .catch((err) => console.log(err));
    }

    function craeteCustonElement(type, content, classOf) {
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

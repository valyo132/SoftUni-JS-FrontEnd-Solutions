function addItem() {
    const newItemValue = document.getElementById('newItemText').value;
    const items = document.getElementById('items');

    let li = document.createElement('li');
    li.textContent = newItemValue;

    items.appendChild(li);
}
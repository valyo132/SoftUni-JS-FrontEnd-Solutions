function addItem() {
    const newTextValue = document.getElementById('newItemText');
    const newItemValue = document.getElementById('newItemValue');

    const menu = document.getElementById('menu');

    let newOption = document.createElement('option');
    newOption.value = newItemValue.value;
    newOption.text = newTextValue.value;
    console.log(newOption);

    menu.appendChild(newOption);

    newItemValue.value = '';
    newTextValue.value = '';
}
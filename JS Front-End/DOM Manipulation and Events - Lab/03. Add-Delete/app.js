function addItem() {
    const newItemValue = document.getElementById('newItemText').value;
    const items = document.getElementById('items');

    let li = document.createElement('li');
    li.textContent = newItemValue;

    let a = document.createElement('a');
    a.textContent = '[Delete]';
    a.href = '#';

    a.addEventListener('click', function(){
        let parent = a.parentElement;
        items.removeChild(parent);
    })

    li.appendChild(a);  

    items.appendChild(li);
}
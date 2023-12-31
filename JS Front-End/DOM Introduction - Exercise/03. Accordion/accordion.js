function toggle() {
    const extra = document.getElementById('extra');
    const button = document.getElementsByClassName('button')[0];

    if (button.textContent == 'More'){
        button.textContent = 'Less';
        extra.style.display = 'block';
    } else if (button.textContent == 'Less'){
        button.textContent = 'More';
        extra.style.display = 'none';
    }
    
}
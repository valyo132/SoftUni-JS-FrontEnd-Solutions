function lockedProfile() {
    const buttons = document.querySelectorAll('button');

    for (const btn of buttons) {
        btn.addEventListener('click', function() {
            const hiddenDiv = btn.parentElement.querySelector('div');
            const radioValue = btn.parentElement.querySelector('input[type="radio"]').checked;

            if (!radioValue){
                if (btn.textContent == 'Show more'){
                    hiddenDiv.style.display = 'block';
                    btn.textContent = 'Hide it';
                } else {
                    hiddenDiv.style.display = 'none';
                    btn.textContent = 'Show more';
                }
            }
            
        });
    }
}
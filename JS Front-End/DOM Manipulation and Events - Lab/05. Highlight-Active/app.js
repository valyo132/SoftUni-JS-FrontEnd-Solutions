function focused() {
    const inputs = document.querySelectorAll('input');
    console.log(inputs);

    for (const el of inputs) {
        el.addEventListener('focus', function() {
            let parent = el.parentElement;
            parent.classList.add('focused');
        });

        el.addEventListener('blur', function() {
            let parent = el.parentElement;
            parent.classList.remove('focused');
        });
    }
}
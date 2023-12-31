function validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.getElementById('email');

    email.addEventListener('change', function() {
        let isMatch = email.value.match(emailRegex);

        if(!isMatch){
            email.classList.add('error');
        } else{
            email.classList.remove('error');
        }
    })
}
function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    const btnCreate = document.getElementById('btnCreate');
    const btnLoad = document.getElementById('btnLoad');
    const [nameInput, phoneInput] = document.querySelectorAll('input');

    const phonebook = document.getElementById('phonebook');

    btnCreate.addEventListener('click', async ()=>{

        if (nameInput.value != '' && phoneInput.value != ''){
            let phoneObj = {['person']: nameInput.value, ['phone']: phoneInput.value};

            await fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify(phoneObj)
            });
        }

        nameInput.value = '';
        phoneInput.value = '';
    });

    let allPhones = {};

    btnLoad.addEventListener('click', load);

    async function load(){
        phonebook.innerHTML = '';

        const response = await fetch(baseUrl);
        allPhones = await response.json();
        console.log(allPhones);

        for (const [phoneId, phoneObj] of Object.entries(allPhones)) {
            let button = document.createElement('button');
            let li = document.createElement('li');
            li.textContent = `${phoneObj.person}: ${phoneObj.phone}`;

            button.textContent = 'Delete';
            button.addEventListener('click', async ()=>{
                await fetch(baseUrl + `/${phoneId}`, {
                    method: 'DELETE',
                });
                li.remove();
            });

            li.appendChild(button);
            phonebook.appendChild(li);
        }
    }

}

attachEvents();
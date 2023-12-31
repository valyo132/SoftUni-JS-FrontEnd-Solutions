function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/messenger';

    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const [nameInput, messageInput] = document.querySelectorAll('#controls div input');
    const textarea = document.getElementById('messages');

    sendBtn.addEventListener('click', async ()=>{

        if (nameInput.value != '' && messageInput.value != ''){
            let messageObj = {['author']: nameInput.value, ['content']: messageInput.value};

            await fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify(messageObj)
            });
        }

        nameInput.value = '';
        messageInput.value = '';
    });

    let allMessages = {};

    refreshBtn.addEventListener('click', async ()=>{
        textarea.textContent = '';

        const response = await fetch(baseUrl);
        allMessages = await response.json();

        let messagesToDisplay = [];

        for (const [messageId, messageObj] of Object.entries(allMessages)) {
            messagesToDisplay.push(`${messageObj.author}: ${messageObj.content}`);
        }

        textarea.textContent = messagesToDisplay.join('\n');
    })
}

attachEvents();
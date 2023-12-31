function encodeAndDecodeMessages() {
    const sendTextArea = document.querySelectorAll('textarea')[0];
    const encodeButton = document.querySelectorAll('button')[0];

    const recieveTextArea = document.querySelectorAll('textarea')[1];
    const decodeButton = document.querySelectorAll('button')[1];

    encodeButton.addEventListener('click', function() {
        let encodedMessage = encode(sendTextArea.value);
        recieveTextArea.value = encodedMessage;
        sendTextArea.value = '';
    });

    decodeButton.addEventListener('click', function(){
        console.log('OK');
        let decodedMessage = decode(recieveTextArea.value);
        recieveTextArea.value = decodedMessage;
    })

    function encode(message){
        let result = '';

        for (let i = 0; i < message.length; i++) {
            let charCode = message.charCodeAt(i);
            charCode += 1;
            result += String.fromCharCode(charCode);
        }

        return result;
    }

    function decode(message){
        let result = '';

        for (let i = 0; i < message.length; i++) {
            let charCode = message.charCodeAt(i);
            charCode -= 1;
            result += String.fromCharCode(charCode);
        }

        return result;
    }
}
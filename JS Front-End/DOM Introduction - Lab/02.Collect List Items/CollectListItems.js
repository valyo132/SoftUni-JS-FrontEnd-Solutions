function extractText() {
    const ul = document.getElementById('items');
    const textArea = document.getElementById('result');
    textArea.textContent += ul.textContent;
}
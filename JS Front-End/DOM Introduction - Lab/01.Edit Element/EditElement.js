function editElement(HTMLelement, match, recplacer) {
    const content = HTMLelement.textContent;
    const matches = new RegExp(match, 'g');
    const edited = content.replace(matches, recplacer);
    HTMLelement.textContent = edited;
}
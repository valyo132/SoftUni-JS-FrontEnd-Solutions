function extract(target) {
    const content = document.getElementById(target);
    const regex = /\(([^)]+)\)/g;
    const els = content.textContent.match(regex);

    let result = els.map(match => match.match(/\(([^)]+)\)/)[1]);
    return result;
}
function colorize() {
    const els = document.querySelectorAll('table tr:nth-child(even)');
    for (const el of els) {
        el.style.background = 'teal';
    }
}
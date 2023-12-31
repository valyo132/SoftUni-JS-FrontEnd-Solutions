function sumTable() {
    const els = document.querySelectorAll('table tbody tr td:last-child');
    const result = document.getElementById('sum');

    let sum = 0;
    for (const el of els) {
        sum += Number(el.textContent);
    }
    result.textContent = sum;
}
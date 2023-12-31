function deleteByEmail() {
    const emailTarget = document.getElementsByTagName('input')[0].value;
    const tds = document.querySelectorAll('table tbody tr td:last-child');
    const tbody = document.querySelectorAll('table tbody')[0];
    const result = document.getElementById('result');
    
    for (const td of tds) {
        if (td.textContent.toLocaleLowerCase().includes(emailTarget.toLowerCase())){
            let parent = td.parentElement;
            tbody.removeChild(parent);

            result.textContent = 'Deleted.';
        }
    }

    if (result.textContent != 'Deleted.'){
        result.textContent = 'Not found.';
    }
}
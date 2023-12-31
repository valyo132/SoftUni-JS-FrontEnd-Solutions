function solve() {
    const clear = document.querySelectorAll('button')[1];
    const check = document.querySelectorAll('button')[0];

    const inputs = Array.from(document.querySelectorAll('input[type="number"]'));

    check.addEventListener('click', function(){
        
    })

    clear.addEventListener('click', function(){
        console.log('clear');
        inputs.forEach(x => x.value = '');
    });
}
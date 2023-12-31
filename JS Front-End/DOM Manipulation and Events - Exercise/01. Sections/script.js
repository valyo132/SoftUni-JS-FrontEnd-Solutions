function create(words) {
   const result = document.getElementById('content');

   for (const word of words) {
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.textContent = word;
      p.style.display = 'none';

      div.appendChild(p);
      result.appendChild(div);
   }

   let divs = document.querySelectorAll('div');

   console.log(divs);
   for (const div of divs) {
      div.addEventListener('click', function() {
         let pOfDiv = div.querySelectorAll('p')[0];
         pOfDiv.style.display = 'block';
      });
   }
}
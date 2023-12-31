function search() {
   const target = document.getElementById('searchText');
   const towns = document.querySelectorAll('ul li');
   const result = document.getElementById('result');

   let count = 0;
   for (const li of towns) {
      if (li.textContent.toLowerCase().includes(target.value.toLowerCase())){
         count++;
         li.style.textDecoration = 'underline';
         li.style.fontWeight = 'bold';
      }
   }

   result.textContent = `${count} matches found`;
}

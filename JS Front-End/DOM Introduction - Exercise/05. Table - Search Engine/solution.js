function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const allElements = document.querySelectorAll('table tbody tr');
      for (const el of allElements) {
         el.classList.remove('select');
      }
   
      const elements = document.querySelectorAll('table tbody tr td');
      const target = document.getElementById('searchField');

      for (const td of elements) {
         if (td.textContent.toLocaleLowerCase().includes(target.value.toLocaleLowerCase())){
            let parent = td.parentElement;
            parent.classList.add('select');
         }
      }

      target.value = '';
   }
}
function solve() {
   const addButtons = Array.from(document.querySelectorAll('button.add-product'));
   const checkout = document.getElementsByClassName('checkout')[0];
   const textarea = document.querySelectorAll('textarea')[0];

   let allProducts = [];
   let totalCost = 0;

   addButtons.forEach(el => {
      el.addEventListener('click', function() {
         let product = el.parentElement.parentElement;
         let productTitle = product.querySelector('.product-title').textContent;
         let productPrice = Number(product.querySelector('.product-line-price').textContent);

         if (!allProducts.includes(productTitle)){
            allProducts.push(productTitle);
         }
         
         totalCost += productPrice;

         textarea.textContent += `Added ${productTitle} for ${productPrice.toFixed(2)} to the cart.\n`;
      })
   })

   checkout.addEventListener('click', function() {
      textarea.textContent += `You bought ${allProducts.join(', ')} for ${totalCost.toFixed(2)}.`;

      checkout.disabled = true;

      addButtons.forEach(el => {
         el.disabled = true;
      });
   })
}
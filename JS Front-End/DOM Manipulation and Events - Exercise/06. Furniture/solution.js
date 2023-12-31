function solve() {
    const generateTextArea = document.querySelectorAll('textarea')[0];
    const resultTextArea = document.querySelectorAll('textarea')[1];
    const generateButton = document.querySelectorAll('button')[0];
    const buyButton = document.querySelectorAll('button')[1];

    const tbody = document.querySelector('tbody');

    generateButton.addEventListener('click', function() {
      let arr = JSON.parse(generateTextArea.value);
      console.log(arr);
      for (const input of arr) {
        addFurniture(input);
      }
    });

    let bougthFurniture = [];
    let totalPrice = 0;
    let decFactors = [];

    buyButton.addEventListener('click', function() {
      const checks = document.querySelectorAll('input');
      
      for (const check of checks) {
        if (check.checked){
          let currentFurniture = check.parentElement.parentElement;

          bougthFurniture.push(currentFurniture.querySelectorAll('td p')[0].textContent);
          totalPrice += Number(currentFurniture.querySelectorAll('td p')[1].textContent);
          decFactors.push(Number(currentFurniture.querySelectorAll('td p')[2].textContent));
        }
      }

      let averageFac = Number(decFactors.reduce((a, b) => a + b, 0) / decFactors.length);

      resultTextArea.textContent += `Bought furniture: ${bougthFurniture.join(', ')}\n`;
      resultTextArea.textContent += `Total price: ${totalPrice.toFixed(2)}\n`;
      resultTextArea.textContent += `Average decoration factor: ${averageFac}`;
    })

    function addFurniture(obj){
      const tr = document.createElement('tr');

      // image td
      const td1 = document.createElement('td');
      const image = document.createElement('img');
      image.src = obj.img;
      td1.appendChild(image);
      tr.appendChild(td1);

      // name td
      const td2 = document.createElement('td');
      const p1 = document.createElement('p');
      p1.textContent = obj.name;
      td2.appendChild(p1);
      tr.appendChild(td2);

      // price td
      const td3 = document.createElement('td');
      const p2 = document.createElement('p');
      p2.textContent = obj.price;
      td3.appendChild(p2);
      tr.appendChild(td3);

      // decFactor td
      const td4 = document.createElement('td');
      const p3 = document.createElement('p');
      p3.textContent = obj.decFactor;
      td4.appendChild(p3);
      tr.appendChild(td4);

      // check td
      const td5 = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      td5.appendChild(checkbox);
      tr.appendChild(td5);

      tbody.appendChild(tr);
    }
}
function solve() {
  const text = document.getElementById('text').value.toLowerCase();
  const namincConvention = document.getElementById('naming-convention').value;
  const result = document.getElementById('result');

  if (namincConvention == 'Camel Case'){
      result.textContent = toCamelCase(text);
  } else if (namincConvention == 'Pascal Case'){
      result.textContent = toPascalCase(text);
  } else{
    result.textContent = 'Error!';
  }

  function toCamelCase(sentence) {
    return sentence.replace(/\s(.)/g, function(match) {
        return match.toUpperCase();
    }).replace(/\s/g, '').replace(/^(.)/, function(match) {
        return match.toLowerCase();
    });
}

function toPascalCase(sentence) {
  return sentence.replace(/\s(.)/g, function(match) {
      return match.toUpperCase();
  }).replace(/\s/g, '').replace(/^(.)/, function(match) {
      return match.toUpperCase();
  });
}
}
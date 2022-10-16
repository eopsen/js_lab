const submitBtn = document.querySelector('.submit-btn');
const inputs = document.querySelectorAll('input');
const boxSum = document.querySelector('.sum');
const boxAvg = document.querySelector('.avg');
const boxMax = document.querySelector('.max');
const boxMin = document.querySelector('.min');
var sum, i;
const addBtn = document.querySelector('.add-btn');
const removeBtn = document.querySelector('.remove-btn');
const boxBtns = document.querySelector('.result__box');
const boxInput = document.querySelector('.input__box');

// Funkcja licząca sumę, średnią, znajdująca max i min
function count() {
  var allInput = document.querySelectorAll('input');
  var inputArr = [];
  i = 0;
  sum = 0;

  for (const element of allInput) {
    var actEl = parseInt(element.value);

    if (!isNaN(actEl)) {
      inputArr[i] = actEl;
      sum = sum + actEl;
      i++;
    }
  }

  var avg = inputArr.reduce((a, b) => a + b, 0) / inputArr.length;
  var max = Math.max(...inputArr);
  var min = Math.min(...inputArr);

  boxSum.textContent = sum;
  boxAvg.textContent = avg;
  boxMax.textContent = max;
  boxMin.textContent = min;
}

// Nasłuchiwanie kliknięcia przycisku przelicz
submitBtn.addEventListener('click', () => {
  count();
});

// Nasłuchiwanie kliknięcia zmian w polach do wprowadzania liczb
for (var element of inputs)
  element.addEventListener('change', () => {
    count();
  });

// Dodawanie nowego pola do wpisania liczby
addBtn.addEventListener('click', () => {
  var newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.addEventListener('change', () => {
    count();
  });

  boxInput.appendChild(newInput);
});

// Usuwanie pustych pól
removeBtn.addEventListener('click', () => {
  var allInput = document.querySelectorAll('input');
  for (var element of allInput) {
    if (element.value === '') {
      element.remove();
    }
  }
});
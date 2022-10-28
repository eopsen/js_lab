let counter = 1;
let sliderInterval = setInterval(intervalFunc, 2000);

document.getElementById("next").addEventListener("click", () => plusSlides(1));
document.getElementById("prev").addEventListener("click", () => plusSlides(-1));
document.getElementById("label-radio1").addEventListener("click", () => currentSlide(1));
document.getElementById("label-radio2").addEventListener("click", () => currentSlide(2));
document.getElementById("label-radio3").addEventListener("click", () => currentSlide(3));
document.getElementById("label-radio4").addEventListener("click", () => currentSlide(4));

function intervalFunc() {
  changeCounter(1);
  document.getElementById('radio' + counter).checked = true;
}

function currentSlide(n) {
  clearInterval(sliderInterval);
  counter = n;
  document.getElementById('radio' + counter).checked = true;
  sliderInterval = setInterval(intervalFunc, 2000);
}

function plusSlides(n) {
  clearInterval(sliderInterval);
  changeCounter(n);
  document.getElementById('radio' + counter).checked = true;
  sliderInterval = setInterval(intervalFunc, 2000);
}

function changeCounter(n) {
  counter += n;
  if (counter > 4) {
    counter = 1;
  }

  if (counter < 1) {
    counter = 4;
  }
}
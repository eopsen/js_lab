const key = ''
const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupBoxTitle = popupBox.querySelector("header p"),
  titleTag = document.querySelector(".title-input"),
  closeIcon = document.querySelector("header i"),
  addBtn = document.querySelector("button");

const cities = JSON.parse(localStorage.getItem("cities") || "[]");

showCities();


addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  titleTag.value = "";
  popupBox.classList.remove("show");
});

addBtn.addEventListener("click", e => {
  e.preventDefault();

  if (cities.length >= 10) {
    alert('Too many cities!')
    closeIcon.click();
    return
  }

  let cityTitle = titleTag.value;

  if (cityTitle) {
    let city = {
      title: cityTitle,
      createdDate: new Date().toLocaleString()
    };

    cities.push(city);
    closeIcon.click();
    saveCities();
  }
});

function showCities() {
  document.querySelectorAll(".city").forEach(city => city.remove());
  cities.forEach((city, index) => {
    getCityWeatherData(city, index)
      .then(data => {
        let desc = 'Wrong city'
        let icon = ''

        if (data) {
          desc = `temperature: ${data.temperature} °C<br>min temperature: ${data.minTemperature} °C<br>max temperature: ${data.maxTemperature} °C<br>humidity: ${data.humidity} %`;
          icon = `<div class="weather-icon">${data.icon}</div>`;
        }

        let liTag = `<li class="city">
            ${icon}
            <div class="details">
              <p>${city.title}</p>
              <span>${desc}</span>
            </div>
            <div class="bottom-content">
              <span></span>
              <div class="settings">
                <i onclick="deleteCity(${index})" class="uil uil-trash"></i>
              </div>
            </div>
          </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
      })
  });
}

function getCityWeatherData(city, index) {
  return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.title}&limit=1&appid=${key}`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      console.log(data);
      if (data && data[0] && data[0] !== 'undefined') {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}&units=metric`)
          .then(response => response.json())
          .then(weatherData => {
            console.log(weatherData)
            if (weatherData) {
              return {
                temperature: weatherData ? weatherData.main.temp.toFixed() : 'N/A',
                minTemperature: weatherData ? weatherData.main.temp_min.toFixed() : 'N/A',
                maxTemperature: weatherData ? weatherData.main.temp_max.toFixed() : 'N/A',
                humidity: weatherData ? weatherData.main.humidity : 'N/A',
                icon: weatherData ? `<img src = 'http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png' alt='asd'>` : 'N/A'
              }
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function showMenu(el) {
  el.parentElement.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function deleteCity(cityIdx) {
  let confirmDel = confirm("Are you sure you want to delete this city?");
  if (!confirmDel) return;

  cities.splice(cityIdx, 1);
  saveCities();
}

function saveCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
  showCities();
}





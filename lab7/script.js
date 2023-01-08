const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupBoxTitle = popupBox.querySelector("header p"),
  titleTag = document.querySelector(".title-input"),
  closeIcon = document.querySelector("header i"),
  addBtn = document.querySelector("button");

const weathers = JSON.parse(localStorage.getItem("weathers") || "[]");

let isUpdate = false, updateId;

showNotes();


addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  titleTag.value = "";

  addBtn.innerText = "Add City";
  popupBoxTitle.innerText = "Add a new city";
  popupBox.classList.remove("show");
  isUpdate = false;
});

addBtn.addEventListener("click", e => {
  e.preventDefault();

  let noteTitle = titleTag.value;

  if (noteTitle) {
    let note = {
      title: noteTitle,
      createdDate: new Date().toLocaleString()
    };

    if (!isUpdate) {
      weathers.push(note);
    } else {
      weathers[updateId].title = noteTitle;
      isUpdate = false;
    }

    closeIcon.click();
    saveNotes();
  }
});

function showNotes() {
  document.querySelectorAll(".note").forEach(note => note.remove());



  weathers.forEach((note, index) => {

    getWeatherData(note.title);
    //TODO get weather


    let liTag = `<li class="note">
                  <div class="details">
                    <p>${note.title}</p>
                    <span>TODO desc</span>
                  </div>
                  <div class="bottom-content">
                    <span>${note.createdDate}</span>
                    <div class="settings">
                      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                      <ul class="menu">
                        <li onclick="updateNote(${index})"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                      </ul> 
                    </div>
                  </div>
                </li>`;

    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

function getWeatherData(cityName) {
  var key = 'a18df494b87559ffb947bd919ec463da';
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`;
  fetch(url)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      console.log(data);
    })
    .catch(function () {
      // catch any errors
    });
}

function showMenu(el) {
  el.parentElement.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteIdx) {
  let confirmDel = confirm("Are you sure you want to delete this city?");
  if (!confirmDel) return;

  weathers.splice(noteIdx, 1);
  saveNotes();
}

function updateNote(noteIdx) {
  let note = weathers[noteIdx];

  if (note) {
    isUpdate = true;
    updateId = noteIdx;

    titleTag.value = note.title;

    addBtn.innerText = "Update city";
    popupBoxTitle.innerText = "Update a city";
    addBox.click();
  }
}


function saveNotes() {
  localStorage.setItem("weathers", JSON.stringify(weathers));
  showNotes();
}





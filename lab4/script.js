const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupBoxTitle = popupBox.querySelector("header p"),
  titleTag = document.querySelector(".title-input"),
  descTag = document.querySelector("textarea"),
  colorTag = document.querySelector(".color-input"),
  closeIcon = document.querySelector("header i"),
  addBtn = document.querySelector("button");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const defaultNoteColor = "#feff9c";

let isUpdate = false, updateId;

showNotes();


addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  titleTag.value = "";
  descTag.value = "";
  colorTag.value = defaultNoteColor;

  addBtn.innerText = "Add Note";
  popupBoxTitle.innerText = "Add a new note";
  popupBox.classList.remove("show");
  isUpdate = false;
});

addBtn.addEventListener("click", e => {
  e.preventDefault();

  let noteTitle = titleTag.value,
    noteDesc = descTag.value,
    noteColor = colorTag.value;

  if (noteTitle && noteDesc) {
    let note = {
      title: noteTitle,
      description: noteDesc,
      color: noteColor,
      isPinned: false,
      createdDate: new Date().toLocaleString()
    };

    if (!isUpdate) {
      notes.push(note);
    } else {
      notes[updateId].title = noteTitle;
      notes[updateId].description = noteDesc;
      notes[updateId].color = noteColor;

      isUpdate = false;
    }

    closeIcon.click();
    saveNotes();
  }
});

function showNotes() {
  document.querySelectorAll(".note").forEach(note => note.remove());

  notes.forEach((note, index) => {
    let bgColor = note.color ? `style="background-color: ${note.color}"` : '';

    let pinMenuText = note.isPinned ? "Unpin" : "Pin";
    let pinnedCls = note.isPinned ? `<div class="pinned-note"><i onclick="pinNote(${index})" class="uil uil-map-pin"></i></div>` : "";

    let liTag = `<li class="note" ${bgColor}>
                  ${pinnedCls}
                  <div class="details">
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                  </div>
                  <div class="bottom-content">
                    <span>${note.createdDate}</span>
                    <div class="settings">
                      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                      <ul class="menu">
                        <li onclick="pinNote(${index})"><i class="uil uil-map-pin"></i>${pinMenuText}</li>
                        <li onclick="updateNote(${index})"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                      </ul> 
                    </div>
                  </div>
                </li>`;

    addBox.insertAdjacentHTML("afterend", liTag);
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
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;

  notes.splice(noteIdx, 1);
  saveNotes();
}

function updateNote(noteIdx) {
  let note = notes[noteIdx];

  if (note) {
    isUpdate = true;
    updateId = noteIdx;

    titleTag.value = note.title;
    descTag.value = note.description;
    colorTag.value = note.color;

    addBtn.innerText = "Update Note";
    popupBoxTitle.innerText = "Update a Note";
    addBox.click();
  }
}

function pinNote(noteIdx) {
  if (notes[noteIdx]) {
    notes[noteIdx].isPinned = !notes[noteIdx].isPinned;
  }

  saveNotes();
}

function saveNotes() {
  console.log('save notes', notes);

  notes.sort((a, b) => {

    if (a.isPinned != b.isPinned) {
      return a.isPinned ? 1 : -1;
    }
    return 0;
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}





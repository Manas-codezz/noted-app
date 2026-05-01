const button = document.getElementById("addBtn");
const input = document.getElementById("noteInput");
const list = document.getElementById("notesList");

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  list.innerHTML = ""; 

  const notes = getNotes();

  notes.forEach((noteText, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = noteText;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    const upBtn = document.createElement("button");
    upBtn.textContent = "⬆";

    const downBtn = document.createElement("button");
    downBtn.textContent = "⬇";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

   
    delBtn.addEventListener("click", function () {
      notes.splice(index, 1);
      saveNotes(notes);
      renderNotes();
    });


    upBtn.addEventListener("click", function () {
      if (index > 0) {
        [notes[index - 1], notes[index]] = [notes[index], notes[index - 1]];
        saveNotes(notes);
        renderNotes();
      }
    });

 
    downBtn.addEventListener("click", function () {
      if (index < notes.length - 1) {
        [notes[index + 1], notes[index]] = [notes[index], notes[index + 1]];
        saveNotes(notes);
        renderNotes();
      }
    });
    editBtn.addEventListener("click", function () {
  
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = notes[index];

      li.replaceChild(editInput, span);

      editInput.focus();
      editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          saveEdit();
        }
      });

      // save on blur (click outside)
      editInput.addEventListener("blur", saveEdit);

      function saveEdit() {
        const newText = editInput.value.trim();

        if (newText !== "") {
          notes[index] = newText;
          saveNotes(notes);
          renderNotes();
        } else {
          renderNotes();
        }
      }
    });

    li.appendChild(span);
    li.appendChild(upBtn);
    li.appendChild(downBtn);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}


function addNote() {
  const noteText = input.value.trim();
  if (noteText === "") return;

  const notes = getNotes();
  notes.push(noteText);
  saveNotes(notes);

  renderNotes();

  input.value = "";
}

button.addEventListener("click", addNote);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addNote();
  }
});

renderNotes();
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
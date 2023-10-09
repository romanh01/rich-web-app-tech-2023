document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("note-input");
    const colorPicker = document.getElementById("color-picker");
    const addNoteBtn = document.getElementById("add-note");
    const noteList = document.getElementById("note-list");

    addNoteBtn.addEventListener("click", () => {
        const noteText = noteInput.value.trim();
        if (noteText === "") return;

        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        const selectedColor = colorPicker.value;
        noteElement.style.backgroundColor = selectedColor;

        noteElement.innerHTML = `
            <div class="note-content">${noteText}</div>
            <div class="note-actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        noteList.appendChild(noteElement);
        noteInput.value = "";

        // Add event listeners for edit and delete buttons
        const editButton = noteElement.querySelector(".edit");
        const deleteButton = noteElement.querySelector(".delete");
        const noteContent = noteElement.querySelector(".note-content");

        editButton.addEventListener("click", () => {
            const editedNoteText = prompt("Edit note:", noteContent.textContent);
            if (editedNoteText !== null) {
                noteContent.textContent = editedNoteText;
            }
        });

        deleteButton.addEventListener("click", () => {
            noteList.removeChild(noteElement);
        });
    });
});
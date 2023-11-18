document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const noteInput = document.getElementById("note-input");
    const colorPicker = document.getElementById("color-picker");
    const addNoteBtn = document.getElementById("add-note");
    const noteList = document.getElementById("note-list");

    // Observable for the click event - Add button
    const addNoteClick$ = rxjs.fromEvent(addNoteBtn, "click");

    const addNoteSubscription = addNoteClick$.subscribe(() => {
        const noteText = noteInput.value.trim();
        if (noteText === "") return;

        // New note element
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

        // Appending note to note list
        noteList.appendChild(noteElement);
        noteInput.value = "";

        const editButton = noteElement.querySelector(".edit");
        const deleteButton = noteElement.querySelector(".delete");
        const noteContent = noteElement.querySelector(".note-content");

        const editButtonClick$ = rxjs.fromEvent(editButton, "click");
        const deleteButtonClick$ = rxjs.fromEvent(deleteButton, "click");

        // Subscribe to the edit button click observable
        const editSubscription = editButtonClick$.subscribe(() => {
            const editedNoteText = prompt("Edit note:", noteContent.textContent);
            // Updatung note content if the user entered a new value
            if (editedNoteText !== null) 
            {
                noteContent.textContent = editedNoteText;
            }
        });
        // Subscribe to the delete button click observable
        const deleteSubscription = deleteButtonClick$.subscribe(() => {
            noteList.removeChild(noteElement);
        });

        // Cleaning up subscriptions when note is deleted
        const cleanupSubscription = deleteButtonClick$.subscribe(() => {
            editSubscription.unsubscribe();
            deleteSubscription.unsubscribe();
            cleanupSubscription.unsubscribe();
        });
    });
});

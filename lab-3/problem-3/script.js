document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const noteInput = document.getElementById("note-input");
    const colorPicker = document.getElementById("color-picker");
    const addNoteBtn = document.getElementById("add-note");
    const noteList = document.getElementById("note-list");

     // Map to keep track of parent notes and child notes
    const parentNotes = new Map();

    // Observable for Add Note button click
    const addNoteClick$ = rxjs.fromEvent(addNoteBtn, "click");

    // Observable for Add Child Note button click
    const addChildNoteClick$ = rxjs.fromEvent(noteList, "click").pipe(
        rxjs.operators.filter(event => event.target.classList.contains("add-child")),
        rxjs.operators.map(event => event.target.parentNode.parentNode)
    );

    // Subscribe to Add Note
    addNoteClick$.pipe(
        rxjs.operators.tap(() => {
            const noteText = noteInput.value.trim();
            if (noteText === "") return;

            const selectedColor = colorPicker.value;

            const noteElement = createNoteElement(noteText, selectedColor);
            noteList.appendChild(noteElement);

            noteInput.value = "";
        })
    ).subscribe();

    // Subscribe to Add Child Note
    addChildNoteClick$.pipe(
        rxjs.operators.tap(parentNote => {
            const childNoteText = prompt("Enter child note:");
            if (childNoteText !== null) 
            {
                const childNoteElement = createNoteElement(childNoteText, parentNote.style.backgroundColor, parentNote);
                parentNotes.get(parentNote).appendChild(childNoteElement);
            }
        })
    ).subscribe();

    // Creating a note
    function createNoteElement(text, color, parent) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.style.backgroundColor = color;

        const noteContentElement = document.createElement("div");
        noteContentElement.classList.add("note-content");
        noteContentElement.textContent = text;
        noteElement.appendChild(noteContentElement);

        const noteActionsElement = document.createElement("div");
        noteActionsElement.classList.add("note-actions");
        noteElement.appendChild(noteActionsElement);

        const editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.textContent = "Edit";
        noteActionsElement.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";
        noteActionsElement.appendChild(deleteButton);

        // If the note is a parent note - adding Add Child Note button & container
        if (parent === undefined) 
        {
            const addChildButton = document.createElement("button");
            addChildButton.classList.add("add-child");
            addChildButton.textContent = "Add Child Note";
            noteActionsElement.appendChild(addChildButton);

            const childNotesContainer = document.createElement("div");
            childNotesContainer.classList.add("child-notes");
            noteElement.appendChild(childNotesContainer);
            parentNotes.set(noteElement, childNotesContainer);
        }

        // Observable for Edit
        const editButtonClick$ = rxjs.fromEvent(editButton, "click").pipe(
            rxjs.operators.tap(() => {
                const editedNoteText = prompt("Edit note:", text);
                if (editedNoteText !== null) 
                {
                    noteContentElement.textContent = editedNoteText;
                }
            })
        );

        // Observable for Delete
        const deleteButtonClick$ = rxjs.fromEvent(deleteButton, "click").pipe(
            rxjs.operators.tap(() => {
                if (parent !== undefined) 
                {
                    parentNotes.get(parent).removeChild(noteElement);
                }
                else
                {
                    noteList.removeChild(noteElement);
                }
            })
        );

        editButtonClick$.subscribe();
        deleteButtonClick$.subscribe();

        return noteElement;
    }
});
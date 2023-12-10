import React, { useState } from 'react';
import WeatherCorner from './WeatherCorner';
import NoteCode from './NoteCode';

const NoteApp = () => {
    const [notes, setNotes] = useState([]); // stores notes - each has text and color
    const [noteText, setNoteText] = useState('');
    const [noteColor, setNoteColor] = useState('#ffffff');

    /* Called when add note clicked, checks if note empty with trim & adds current note text & color to note object - that is added to notes array */
    const addNote = () => {
        if (noteText.trim() === '') return;

        const newNote = {
            text: noteText.trim(),
            color: noteColor,
        };

        setNotes([...notes, newNote]);
        setNoteText('');
    };

    /* When edit clicked, creates a copy of the notes array, updates text of the note at the specified index */
    const editNote = (index, newText) => {
        const updatedNotes = [...notes];
        updatedNotes[index].text = newText;
        setNotes(updatedNotes);
    };

    /* When delete clicked - note deleted at index */
    const deleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
    };

    return (
        <div className="container mt-5">
        {/* WeatherCorner component at the top right */}
        <div className="d-flex justify-content-between">
            <h1 className="text-center mb-4">My Notes</h1>
            <WeatherCorner />
        </div>

        <div className="note-input d-flex mb-3">
            <input
            type="text"
            className="form-control mr-2"
            placeholder="Enter your note here"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            />
            <input
            type="color"
            className="form-control"
            style={{ width: '8%' }}
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
            />
            <button className="btn btn-primary ml-2" onClick={addNote}>
            Add
            </button>
        </div>

        <div className="note-list">
            {notes.map((note, index) => (
            <div
                key={index}
                className="note d-flex justify-content-between align-items-center p-3 mb-2"
                style={{ backgroundColor: note.color }}
            >
                <div className="note-content">{note.text}</div>
                <NoteCode
                noteText={note.text}
                onEdit={(newText) => editNote(index, newText)}
                onDelete={() => deleteNote(index)}
                />
            </div>
            ))}
        </div>
        </div>
    );
};

export default NoteApp;

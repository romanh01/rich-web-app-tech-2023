import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const NoteCode = ({ noteText, onEdit, onDelete }) => {
    const [editing, setEditing] = useState(false); // whether the note is currently being edited
    const [editedText, setEditedText] = useState(noteText); // string state to store the edited text of the note.

    /* When Edit Note clicked */
    const handleEdit = () => {
        setEditing(true);
    };

    /* When Save Note clicked */
    const handleSaveEdit = () => {
        onEdit(editedText);
        setEditing(false);
    };

    /* When Cancel Edit clicked */
    const handleCancelEdit = () => {
        setEditedText(noteText);
        setEditing(false);
    };

    return (
        <div className="note-code">
        {editing ? (
            <>
            <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
            </>
        ) : (
            <>
            <QRCode value={noteText} /> {/* If not in editing mode, the component renders a QRCode component with the value set to the noteText. */}
            <button onClick={handleEdit}>Edit Note</button>
            <button onClick={onDelete}>Delete Note</button>
            </>
        )}
        </div>
    );
};

export default NoteCode;
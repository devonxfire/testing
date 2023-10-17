import { useState } from "react";
import React from "react";

function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote() {
    setNotes([
      ...notes,
      { name: noteTitle, id: crypto.randomUUID(), completed: false },
    ]);
    setNoteTitle("");
  }

  function deleteNote(noteId) {
    const updateNotes = notes.filter((note) => {
      return noteId != note.id;
    });

    setNotes(updateNotes);
  }

  function toggleCheck(noteId, completed) {
    setNotes((currentNotes) => {
      return currentNotes.map((note) => {
        if (noteId === note.id) {
          return { ...note, completed };
        }

        return note;
      });
    });
  }

  return (
    <>
      {notes.map((note) => {
        return (
          <div key={note.id} style={{ display: "flex" }}>
            <input
              type="checkbox"
              onChange={(e) => toggleCheck(note.id, e.target.checked)}
            />
            <p>{note.name}</p>
            <button
              onClick={() => {
                deleteNote(note.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}

      <h1>Add a Note:</h1>
      <input
        type="text"
        placeholder="Enter the title of your note..."
        value={noteTitle}
        onChange={(e) => {
          setNoteTitle(e.target.value);
        }}
      />
      <button onClick={addNote}>Add Note</button>
    </>
  );
}

export default App;

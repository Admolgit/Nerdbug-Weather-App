import React, { useState, useEffect } from 'react';
import Style from '../style/cities.module.css';

export default function Note() {
  const [noteItems, setNoteItems] = useState([]);
  const [editNote, setEditNote] = useState(false);

  // get notes from local storage
  useEffect(() => {
  const getNotes = () => {
    const notes = localStorage.getItem('notes');
    if (notes) {
     const jsonNotes = JSON.parse(notes);
     setNoteItems(jsonNotes);
    }
  };
  getNotes();
  }, []);

  // random id
  const randomId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  // add note to local storage
  const addNote = (note) => {
    note.preventDefault();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(!note.target.elements.id.value) {
    notes.push({id: randomId(), title: note.target.elements.title.value, content: note.target.elements.note.value});
    } else {
      
      const noteFound = notes.find((noteItem) => Number(noteItem.id) === Number(note.target.elements.id.value));
      noteFound.title = note.target.elements.title.value;
      noteFound.content = note.target.elements.note.value;
      const noteIndex = notes.findIndex(noteItem => Number(noteItem.id) === Number(note.target.elements.id.value));
      notes.splice(noteIndex, 1, noteFound);
    }
      
    localStorage.setItem('notes', JSON.stringify(notes));
    setNoteItems(notes);
    note.target.elements.id.value = '';
    note.target.elements.title.value = '';
    note.target.elements.note.value = '';
  };

  // edit note
  const handleNoteEdit = (id) => {
    const note = noteItems.find((note) => note.id === id);
    setEditNote(true);

    const valueElements = document.getElementById('form').elements
    valueElements.id.value = note.id;
    valueElements.title.value = note.title;
    valueElements.note.value = note.content;
  };

  // delete note
  const handleNoteDelete = (id) => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const filteredNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    setNoteItems(filteredNotes);
  };

  return (
    <div className={Style.noteContainer}>
      <div className={Style.formBox}>
        <h1 className={Style.title}>Add Notes</h1>
        <form onSubmit={addNote} id='form' className={Style.form}>
          <input type="hidden" name='id' disabled />
          <input className={Style.input} type="text" name='title' placeholder="Title" />
          <textarea className={Style.textarea} name='note' />
          <button type="submit" className={Style.button}>
            Save
          </button>
        </form>
      </div>
      <div className={Style.firstContainer}>
        {noteItems ? noteItems.map((note) => {
          return (
            <div className={Style.mapItems} key={note.id}>
              <div>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
              </div>
              <div className={Style.buttonContainer}>
              <button className={Style.button} onClick={() => handleNoteEdit(note.id)}>Edit</button>
              <button className={Style.button} onClick={() => handleNoteDelete(note.id)}>Delete</button>
              </div>
            </div>
          );
        }) : <p>No notes found...</p>}
      </div>
    </div>
  );
}

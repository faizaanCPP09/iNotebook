//iss file mein humney 'state' banai hai, Joki sab ko accessible ho (if required)

import React, { useState } from 'react'
import NoteContext from './noteContext'

  //arrow function
  const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


    // 1. Get all Notes
  const getNotes = async () => {
    // API Call
    //Below code snippet is copied from `fetch API with headers` doc (and same is for all)
 
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() //replaced with this code line:[return response.json();]
    setNotes(json)
  }

    // 2. Add a Note
    const addNote = async (title, description, tag) => {

    // API Call: yeh isliye lagani hai, kyunki hame notes backend mein bhi add krne hai..written below
    // Below code snippet [35-42] is copied from `fetch API with headers` doc (and same is for all)
    
    const response = await fetch(`${host}/api/note/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json(); 

    // console.log("Adding New notes");
    //console.log('Before setNotes', typeof (notes));

    //Below two lines is added for adding note using 'concat' in frontend
    const notesArray = Object.values(notes);
    setNotes(notesArray.concat(note));
    //console.log('After setNotes', notes);
  }

    // 3. Delete a Note
    const deleteNote = async (id) => {
    // API Call: yeh isliye lagani hai, kyunki hamey notes backend mein se bhi delete krne hai..written below
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
    
    //command line for deleting note:
    const newNotes = notes.filter((note) => { return note._id !== id }) //isse sirf frontend se delete hogi, but kyunki humne uper API Call likhi hai..thats why it will delete from backend DB
    setNotes(newNotes)
  }

    // 4. Edit a Note
    const editNote = async (id, title, description, tag) => {
    // API Call: yeh isliye lagani hai, kyunki hame notes backend mein bhi note edit krne hai..written below
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))


    // Logic to edit in client..using 'for' loop
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  //Return the provider with the value that you want to share
  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
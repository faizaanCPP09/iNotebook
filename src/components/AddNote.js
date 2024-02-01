//Importing Modules and files
import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;  //{addNote} destructures the addNote function from the context.

    // useState is used to create a state variable note with an initial state containing empty strings for title, description, and tag.
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    //handleClick is an event handler for form submission. It prevents the default form submission behavior, calls addNote with the current state values, and then resets the state to clear the form fields
    const handleClick = (e) => {
        e.preventDefault();  //Parameter `e` represents an 'event object'
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })   //After submitting the note, it resets the note state to an empty state, clearing out the input fields. This is done to prepare for entering a new note. 
    }

    //onChange is an event handler for input changes. It updates the note state dynamically as the user types into form fields.
    const onChange = (e) => {
        //setNote: This seems to be a function that updates the state variable note. In React or similar frameworks, setNote is often associated with the useState hook, used to manage state in functional components.
        setNote({ ...note, [e.target.name]: e.target.value })        //to create a shallow copy of the current state{...note} spread operator is used in JS
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
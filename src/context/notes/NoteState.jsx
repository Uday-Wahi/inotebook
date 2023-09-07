import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const url = "https://rich-lime-butterfly-wear.cyclic.cloud/";
  // const url = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("notetoken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note.savedNote));
  };

  // GET ALL NOTES
  // completed
  const getNote = async () => {
    // API Call
    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("notetoken"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // UPDATE A NOTE
  // completed
  const updateNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("notetoken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // update note logic
    for (let index = 0; index < notes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // DELETE A NOTE
  // completed
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("notetoken"),
      },
    });
    const json = await response.json();
    console.log(json);

    // delete note logic
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNote, url }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

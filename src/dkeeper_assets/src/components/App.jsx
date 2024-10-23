import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title, newNote.content) //newnote has these attr from React
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {  //this is react hook that gets triggered upon re-rendering of the react component.
    console.log("useEffect is triggered")
    fetchData(); //function that pulls backend data to serve to frontend
  }, []);  //the 2nd param of this useeffect is an empty array to prevent an infinite loop

  async function fetchData() {
    const notesArray = await dkeeper.readNotes();  //asynchronously fetching backend data from notes array
    setNotes(notesArray); //setting state of the array with data received from the backend 
  }  

  function deleteNote(id) {
    dkeeper.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

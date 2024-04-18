'use client'
// Import necessary modules

import { useState, useEffect } from 'react';
import AddNote from '../AddNote/AddNote';

// Function to fetch notes
async function getNotes() {
  const res = await fetch("http://localhost:4000/notes", {cache:"no-store"});
  return res.json();
}

// Component function
export default function NoteList() {

  const [notes, setNotes] = useState([]); // State to store notes
  const [editNote, setEditnote] = useState();
  
  // Effect to fetch notes when component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes); // Set the notes state with fetched notes
      } catch (error) {
        console.error('Error fetching notes:', error);
        // Handle error, show error message, etc.
      }
    };
    fetchNotes(); // Call the fetchNotes function
  }, []); // Empty dependency array ensures the effect runs only once after component mount

  // Function to handle note deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/notes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log success message
        // Handle any UI updates or notifications
        location.reload()
        // if(data.message)router.refresh()
        // You might want to update the notes state after deletion if needed
      } else {
        throw new Error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      // Handle error, show error message, etc.
    }
  };


 // Function to handle note editing
// const handleEdit = async (id) => {
//   setIsedit(true);
//   const getNoteById = notes.find(note => note.id ===id );
  
// };


  // Render function
  return (
    <main>
  
      {notes.map((note) => (
          
        <div className='flex justify-between card my-5 ' key={note.id}>
            <div className='min-w-40'>
              <div className='mb-5 font-semibold '>
                {note.title}
              </div>
              <div>
                {note.body.slice(0, 200)}
              </div>
              <div>
                Priority: <span className='font-medium'> {note.priority}</span>
              </div>
            </div>

          {note.id === editNote ? <AddNote edit={true} note={note}/>: 
          <div className='mx-10 my-auto z-10'>
            <button className="btn-primary my-2 mx-4" onClick={() => setEditnote(note.id)}> Edit </button> 
            <button className="btn-primary" onClick={() => handleDelete(note.id)}> Delete </button>
          </div>
}
        </div>
      
      ))}
    </main>
  );
}

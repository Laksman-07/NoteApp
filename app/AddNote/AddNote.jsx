"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNote({edit=false,note}) {
    const router = useRouter()
    const [title, setTitle] = useState(edit ? note.title : '');
    const [body, setBody] = useState(edit ? note.body : '');
    const [priority, setPriority] = useState(edit ? note.priority : 'Low');
  
    const handleSubmit = async (e)  => {
        e.preventDefault()
        // setIsLoading(true)
    
        const noteData = { title, body, priority }
    
        try {
          const response = await fetch('http://localhost:4000/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
          });
      
          if (!response.ok) {
            throw new Error('Failed to add note');
          }
      
          const data = await response.json();
          router.push('/Notes')
          router.refresh()
          console.log('Note added:', data);

        } catch (error) {
          console.error('Error adding note:', error.message);
        }
      };

      const handleSave = async (id) =>{
        // e.preventDefault();
        let updatedNote = {title, body, priority}
        console.log(updatedNote);
        try {
          const response = await fetch(`http://localhost:4000/notes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedNote)
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data);
           
            // Log success message or updated note data
            // Handle any UI updates or notifications
            // Redirect to the edited note page or update state as needed
          } else {
            throw new Error('Failed to edit note');
          }
        } catch (error) {
          console.error('Error editing note:', error);
          // Handle error, show error message, etc.
        }
      }

  return (
    <main>        
    <div className='flex justify-center '>
    <form className='grid justify-center items-center card w-1/2'>
    <label>
        <span>Title:    </span>
        <input className='w-3/4 mt-[2%] ml-[28%] mb-2'
          required={!edit}
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
       <label>
        <span>Body:    </span>
        <textarea className='w-3/4 mt-[2%] ml-[28%] mb-2'
          required={!edit}
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:     </span>
        <select className='w-3/4 ml-[20%] mb-4'
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
      </label>
      {edit? 
      <button className='btn-primary ' onClick={()=>handleSave(note.id)}> Save </button>:
      <button className='btn-primary ' onClick={handleSubmit}> Add Note </button>
      
      }
      
    </form>
    </div>
    </main>
  )
}

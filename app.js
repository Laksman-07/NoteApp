const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

// Sample data to store notes
let notes = [
    { id: 1, title: "Note 1", body: "This is the body of Note 1", priority: "High" },
    { id: 2, title: "Note 2", body: "This is the body of Note 2", priority: "Medium" }
];
// GET endpoint to retrieve all notes
app.get('/notes', (req, res) => {
    return res.json(notes);
});

// POST endpoint to create a new note
app.post('/notes', (req, res) => {
    const { title, body, priority } = req.body;

    // Basic validation
    if (!title || !body || !priority) {
        return res.status(400).json({ error: "Please provide title, body, and priority for the note." });
    }

    // Create new note object
    const newNote = {
        id: notes.length + 1,
        title,
        body,
        priority
    };

    // Add new note to the array
    notes.push(newNote);

    // Return success response
    res.status(201).json(newNote);
});

// GET endpoint to retrieve a specific note by ID
app.get('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params['id']); // Extract note id from URL parameter

    // Find the note with the given id
    const note = notes.find(note => note.id === noteId);

    // If note with given id is not found, return 404 Not Found
    if (!note) {
        return res.status(404).json({ error: "Note not found." });
    }

    // Return the found note
    res.json(note);
});

// PUT endpoint to update an existing note by ID
app.put('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id); // Extract note id from URL parameter
    const { title, body, priority } = req.body;

    // Find the index of the note with the given id
    const noteIndex = notes.findIndex(note => note.id === noteId);

    // If note with given id is not found, return 404 Not Found
    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found." });
    }

    // Update note with new data
    notes[noteIndex] = {
        ...notes[noteIndex], // Preserve existing properties
        title: title || notes[noteIndex].title, // Use new title if provided, otherwise keep existing title
        body: body || notes[noteIndex].body, // Use new body if provided, otherwise keep existing body
        priority: priority || notes[noteIndex].priority // Use new priority if provided, otherwise keep existing priority
    };

    // Return success response
    res.json(notes[noteIndex]);
});

// DELETE endpoint to delete an existing note by ID
app.delete('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id); // Extract note id from URL parameter

    // Find the index of the note with the given id
    const noteIndex = notes.findIndex(note => note.id === noteId);
    
    // If note with given id is not found, return 404 Not Found
    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found." });
    }

    // Remove the note from the notes array
    notes.splice(noteIndex, 1);

    // Return success response
    res.json({ message: "Note deleted successfully." });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

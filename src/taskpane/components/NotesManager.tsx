import React, { useEffect, useState } from 'react';

interface NotesManagerProps {
  conversationId: string;
  emailId: string;
  subject: string;
}

interface Note {
  emailId: string;
  subject: string;
  note: string;
}

const NotesManager: React.FC<NotesManagerProps> = ({ conversationId, emailId, subject }) => {
  const [notes, setNotes] = useState<string>(''); // Input field for the new note
  const [savedNotes, setSavedNotes] = useState<Note[]>([]); // Array to store saved notes
  const [error, setError] = useState<string | null>(null); // Error message state

  // Fetch notes from localStorage or wherever you store them
  useEffect(() => {
    try {
      const savedNotesString = localStorage.getItem(conversationId); // Use conversationId as the key
      if (savedNotesString) {
        setSavedNotes(JSON.parse(savedNotesString)); // Parse and set the saved notes
      }
    } catch (err) {
      setError('Error fetching notes.');
    }
  }, [conversationId]);

  // Save a new note along with emailId and subject
  const saveNotes = () => {
    try {
      const newNote: Note = { emailId, subject, note: notes };
      const updatedNotes = [...savedNotes, newNote];
      setSavedNotes(updatedNotes);
      localStorage.setItem(conversationId, JSON.stringify(updatedNotes)); // Store the updated notes
      setNotes(''); // Clear the input field
    } catch (err) {
      setError('Error saving notes.');
    }
  };

  return (
    <div>
      <div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          cols={40}
          placeholder="Add notes for this email thread"
        />
        <button onClick={saveNotes}>Save Notes</button>
      </div>
      {error && <p>{error}</p>}

      {/* Display saved notes */}
      <div>
        <h3>Saved Notes for this Conversation</h3>
        {savedNotes.length > 0 ? (
          <ul>
            {savedNotes.map((note, index) => (
              <li key={index}>
                <strong>Subject:</strong> {note.subject} <br />
                <strong>Email ID:</strong> {note.emailId} <br />
                <p>{note.note}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotesManager;

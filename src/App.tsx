import { useState } from "react";
import { Note } from "./types/note";
import { getInitialData } from "./utils";
import NoteList from "./components/NoteList";
import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState<Note[]>(getInitialData);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const addNote = (note: Note): void => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const deleteNote = (id: string | number) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  };

  const toggleArchivedNote = (id: string | number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredNotes = searchQuery
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  return (
    <main>
      <Navbar />
      <div className="container">
        <NoteForm addNote={addNote} />
        <div className="flex justify-center">
          <div className="border border-neutral-200 px-4 py-2 rounded-xl w-full max-w-xl flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search notes"
              onChange={(e) => handleSearch(e.target.value)}
              className="focus:outline-none  w-full"
            />
          </div>
        </div>
        <NoteList
          notes={filteredNotes}
          deleteNote={deleteNote}
          toggleArchivedNote={toggleArchivedNote}
        />
      </div>
    </main>
  );
};

export default App;
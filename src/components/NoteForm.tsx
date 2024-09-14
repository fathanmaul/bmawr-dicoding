import React from "react";
import { Note } from "../types/note";
type NoteFormProps = {
  addNote: (note: Note) => void;
};

export default function NoteForm({ addNote }: NoteFormProps) {
  const [form, setForm] = React.useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "title" && value.length > 50) return;
    
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.body) return;

    const newNote = {
      id: new Date().getTime().toString(),
      title: form.title || "(undefined)",
      body: form.body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    addNote(newNote);
    setForm({ title: "", body: "" });
  };

  return (
    <div className="my-8 w-full">
      <form
        className="flex flex-col gap-3 items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full text-center max-w-xl">
          <p className="text-neutral-400 text-end">
            {form.title.length} / 50
          </p>
          <input
            type="text"
            name="title"
            value={form.title}
            className="border border-neutral-200 px-4 py-2 rounded-xl focus:outline-none w-full"
            placeholder="Title"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full text-center max-w-xl">
          <textarea
            name="body"
            value={form.body}
            className="w-full px-4 py-2 border border-neutral-200 rounded-xl focus:outline-none min-h-48"
            placeholder="Description"
            onChange={handleInputChange}></textarea>
        </div>
        <div className="w-full text-center max-w-xl">
          <button 
            type="submit"
            className="text-white rounded-xl px-4 py-2 bg-slate-700 w-full transition-all duration-300 active:scale-95">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
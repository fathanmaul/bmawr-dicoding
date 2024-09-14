import { Note } from "../types/note";
import NoteItem from "./NoteItem";

type NoteListProps = {
  notes: Note[];
  deleteNote: (id: string | number) => void;
  toggleArchivedNote: (id: string | number) => void;
};

export default function NoteList({
  notes,
  deleteNote,
  toggleArchivedNote,
}: NoteListProps) {
  const filterNotes = (archived: boolean) =>
    notes.filter((note) => note.archived === archived);

  const renderNotes = (filteredNotes: Note[], title: string) => (
    <>
      <h4 className="my-5 font-bold text-2xl">{title}</h4>
      {filteredNotes.length > 0 ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              deleteNote={() => deleteNote(note.id)}
              toggleArchiveNote={() => toggleArchivedNote(note.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Nothing to see here :(</p>
      )}
    </>
  );

  return (
    <div className="pb-8">
      {renderNotes(filterNotes(false), "Active Notes")}
      {renderNotes(filterNotes(true), "Archived Notes")}
    </div>
  );
}

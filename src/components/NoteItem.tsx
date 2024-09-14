import { Note } from "../types/note";
import { showFormattedDate } from "../utils";

type NoteItemProps = {
  note: Note;
  deleteNote: () => void;
  toggleArchiveNote: () => void
};

export default function NoteItem(props: NoteItemProps) {
  return (
    <div className="hover:shadow-lg border border-neutral-200 transition-all duration-300 p-6 rounded-xl min-h-64 flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-2xl text-ellipsis overflow-hidden">{props.note.title}</h3>
        <p className="text-sm text-neutral-500">
          {showFormattedDate(props.note.createdAt)}
        </p>
        <p>{props.note.body}</p>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-yellow-400 w-full rounded-xl" onClick={props.toggleArchiveNote}>
          {
            props.note.archived ? "Unarchive": "Archive"
          }
        </button>
        <button className="px-4 py-2 bg-red-400 w-full rounded-xl" onClick={props.deleteNote}>
          Delete
        </button>
      </div>
    </div>
  );
}

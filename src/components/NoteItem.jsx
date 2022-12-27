import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = ({ note, editNote, showAlert }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title me-auto">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteNote(note._id);
                showAlert("Deleted successfully", "success");
              }}></i>
            <i
              className="far fa-edit mx-1"
              style={{ cursor: "pointer" }}
              onClick={() => {
                editNote(note);
              }}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

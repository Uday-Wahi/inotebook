import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNote, updateNote } = context;

  useEffect(() => {
    if (localStorage.getItem("notetoken")) getNote();
    else navigate("/login");
    // eslint-disable-next-line
  }, []);

  const modalRef = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({
    id: "",
    utitle: "",
    udescription: "",
    utag: "",
  });

  const editNote = (currentNote) => {
    modalRef.current.click();
    setNote({
      id: currentNote._id,
      utitle: currentNote.title,
      udescription: currentNote.description,
      utag: currentNote.tag,
    });
  };

  const handleClick = () => {
    updateNote(note.id, note.utitle, note.udescription, note.utag);
    closeRef.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={modalRef}
        type="button"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#updatenotemodal"></button>

      <div
        className="modal fade"
        id="updatenotemodal"
        tabIndex="-1"
        aria-labelledby="editnotelabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editnotelabel">
                Edit Note
              </h5>
              <button
                ref={closeRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-4">
                <div className="mb-3">
                  <label htmlFor="utitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="utitle"
                    name="utitle"
                    value={note.utitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="udescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="udescription"
                    name="udescription"
                    value={note.udescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="utag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="utag"
                    name="utag"
                    value={note.utag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                disabled={
                  note.utitle.length < 5 || note.udescription.length < 10
                }
                type="button"
                className="btn btn-success"
                onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <h2 className="mb-3">Your Notes</h2>
        <h5>{notes.length === 0 && "No notes to display"}</h5>
        {notes.map((note) => {
          return (
            <NoteItem
              note={note}
              editNote={editNote}
              showAlert={props.showAlert}
              key={note._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;

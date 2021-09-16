import react from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const obj = { name: "Uday", salary: 800000 };
  return (
    <NoteContext.Provider value={obj}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;

import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export interface NoteProp {
  category: string;
  details: string;
  id: number;
  title: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteProp[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const deleteNoteHandler = async (id: number) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard
              key={note.id}
              note={note}
              deleteNoteHandler={deleteNoteHandler}
            />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};

export default Notes;

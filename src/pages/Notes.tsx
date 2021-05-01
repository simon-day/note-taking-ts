import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";

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

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard
              key={note.id}
              note={note}
              deleteNoteHandler={deleteNoteHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;
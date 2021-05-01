import React from "react";
import { NoteProp } from "../pages/Notes";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";

type Props = {
  note: NoteProp;
  deleteNoteHandler: (id: number) => void;
};

const NoteCard: React.FC<Props> = ({ note, deleteNoteHandler }) => {
  return (
    <Card elevation={1}>
      <CardHeader
        action={
          <IconButton onClick={() => deleteNoteHandler(note.id)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography color="textSecondary" variant="body2">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;

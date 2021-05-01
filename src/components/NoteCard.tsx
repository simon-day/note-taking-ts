import React from "react";
import { NoteProp } from "../pages/Notes";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { blue, green, pink, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note: NoteProp) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[700];
      }
      if (note.category === "reminders") {
        return pink[500];
      }
      if (note.category === "todos") {
        return blue[500];
      }
    },
  },
});

type Props = {
  note: NoteProp;
  deleteNoteHandler: (id: number) => void;
};

const NoteCard: React.FC<Props> = ({ note, deleteNoteHandler }) => {
  const classes = useStyles(note);

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {note.category[0].toUpperCase()}
          </Avatar>
        }
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

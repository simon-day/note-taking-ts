import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  makeStyles,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router";

type ErrorProps = {
  title?: string;
  details?: string;
};

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const Create: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");
  const [errors, setErrors] = useState<ErrorProps>({ title: "", details: "" });
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setErrors({ title: "", details: "" });
    e.preventDefault();

    if (noteDetails.trim() === "") {
      setErrors({ ...errors, details: "Details cannot be empty" });
      return;
    }
    if (noteTitle.trim() === "") {
      setErrors({ ...errors, title: "Details cannot be empty" });
      return;
    }

    fetch("http://localhost:8000/notes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: noteTitle,
        details: noteDetails,
        category,
      }),
    }).then(() => history.push("/"));
  };

  return (
    <Container maxWidth="lg">
      <Typography
        color="textSecondary"
        variant="h6"
        component="h2"
        gutterBottom
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          fullWidth
          required
          variant="outlined"
          label="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          error={!!errors.title}
        />

        <TextField
          className={classes.field}
          fullWidth
          required
          variant="outlined"
          multiline
          rows={4}
          label="Details"
          value={noteDetails}
          onChange={(e) => setNoteDetails(e.target.value)}
          error={!!errors.details}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio />} label="Money" value="money" />
            <FormControlLabel control={<Radio />} label="Todos" value="todos" />
            <FormControlLabel
              control={<Radio />}
              label="Reminders"
              value="reminders"
            />
            <FormControlLabel control={<Radio />} label="Work" value="work" />
          </RadioGroup>
        </FormControl>

        <Button
          endIcon={<ChevronRightIcon fontSize="small" />}
          disableTouchRipple
          variant="contained"
          color="secondary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;

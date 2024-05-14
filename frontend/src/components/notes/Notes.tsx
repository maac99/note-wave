import { NoteContent } from "./NoteContent";
import { SidePanel } from "./SidePanel";
import "./Notes.css";
import React from "react";
import {
  Divider,
  SelectTabData,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { useNotes } from "../utils/useNotes";

const useStyles = makeStyles({
  divider: {
    height: "100%",
    flexGrow: 0,
    "::after": {
      ...shorthands.borderColor(tokens.colorPaletteCornflowerBackground2),
    },
    "::before": {
      ...shorthands.borderColor(tokens.colorPaletteCornflowerBackground2),
    },
  },
});

export const Notes = () => {
  const [needRefresh, setNeedRefresh] = React.useState(Date.now());
  const { activeNotes, archivedNotes } = useNotes(needRefresh);

  const [selectedNote, setSelectedNote] = React.useState<string | null>(null);
  const onTabSelect = (_: unknown, data: SelectTabData) => {
    setSelectedNote(data.value as unknown as string);
  };

  const onArchiveNote = () => {
    setNeedRefresh(Date.now());
  };

  const onSaveNote = () => {
    setNeedRefresh(Date.now());
  }

  const styles = useStyles();
  const onAddOrDeleteNote = (noteId: string | null) => {
    setNeedRefresh(Date.now());
    setSelectedNote(noteId);
  };

  return (
    <div className="notes-grid">
      <div className="notes-sidepanel-container">
        <SidePanel
          onNoteSelect={onTabSelect}
          selectedNote={selectedNote}
          onAddOrDeleteNote={onAddOrDeleteNote}
          activeNotes={activeNotes}
          archivedNotes={archivedNotes}
          onArchiveNote={onArchiveNote}
        />
        <Divider vertical className={styles.divider} />
      </div>
      <NoteContent selectedNote={selectedNote} onSaveNote={onSaveNote}/>
    </div>
  );
};

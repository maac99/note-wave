import React from "react";
import { PartialListNote } from "./notes";
import { baseUrl } from "./constants";

const activeNotesPath = "notes/actives";
const archivedNotesPath = "notes/archived";
export const useNotes = (needRefresh: number) => {
  const [archivedNotes, setArchivedNotes] = React.useState<PartialListNote[]>();
  const [activeNotes, setActiveNotes] = React.useState<PartialListNote[]>();

  React.useEffect(() => {
    fetch(`${baseUrl}/${activeNotesPath}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setActiveNotes([...data] as PartialListNote[]);
      });

    fetch(`${baseUrl}/${archivedNotesPath}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArchivedNotes([...data] as PartialListNote[]);
      });
  }, [needRefresh]);

  return { activeNotes, archivedNotes };
};

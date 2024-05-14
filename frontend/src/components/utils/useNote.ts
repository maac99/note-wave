import React from "react";
import { Note } from "./notes";
import { baseUrl } from "./constants";

export const useNote = (noteId: string | null) => {
  const detailedNotePath = `notes/${noteId}`;
  const [detailedNote, setDetailedNote] = React.useState<Note>();

  React.useEffect(() => {
    if (!noteId) {
        setDetailedNote(undefined);
        return;
    }
    fetch(`${baseUrl}/${detailedNotePath}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let serializedContent = data.content || "{}";
        setDetailedNote({
          ...data,
          content: JSON.parse(serializedContent),
        } as Note);
      });
  }, [noteId, setDetailedNote]);

  return detailedNote;
};

import { baseUrl } from "./constants";

const archivePath = (noteId: string) => `notes/${noteId}/archive`;
const deletePath = (noteId: string) => `notes/${noteId}`;
const savePath =`notes`;
export const toggleArchiveNote = (noteId: string) => {
  return fetch(`${baseUrl}/${archivePath(noteId)}`, {
    method: "PUT",
  });
};

export const deleteNote = (noteId: string) => {
  return fetch(`${baseUrl}/${deletePath(noteId)}`, {
    method: "DELETE",
  });
};

export const saveNote = (noteId: string, title: string, content: string) => {
  return fetch(`${baseUrl}/${savePath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: noteId,
      title: title,
      content: content,
    }),
  });
};

export const createNote = (title: string, content: string) => {
  return fetch(`${baseUrl}/${savePath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
      tags: []
    }),
  });
};

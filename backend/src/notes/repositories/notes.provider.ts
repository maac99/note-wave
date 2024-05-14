import { Note } from "../entities/notes.entity";

export const notesProviders = [
  {
    provide: 'NOTES_REPOSITORY',
    useValue: Note,
  },
];